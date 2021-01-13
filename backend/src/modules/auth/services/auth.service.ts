import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/modules/user/models/user.entity';
import { toUserDto } from 'src/utils/toUsersDto';
import { CacheService } from '../../../modules/cache/services/cache.service';
import { CreateUserDto, UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/services/user.service';
import { LoginStatus } from '../interfaces/LoginStatus.interface';
import { RegisterStatus } from '../interfaces/RegisterStatus.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}



  public async register(createUserDto: CreateUserDto): Promise<RegisterStatus> {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (!user) {
      const createdUser = await this.userService.createUser(createUserDto);

      if (createdUser && createdUser.id) {
        const registerStatus: RegisterStatus = {
          message: 'Registration success.'
        } 
        return registerStatus
      }
      else
        throw new HttpException(
          'Cant create user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    } else {
      throw new HttpException(
        'Found user with this email.',
        HttpStatus.CONFLICT,
      );
    }
  }

  public async login(user: UserEntity): Promise<LoginStatus> {
    const token = await this.createToken(user);
    await this.storeTokenInWhiteList(user.email, token);
    const loginStatus = {
      token
    }
    return loginStatus
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

    return toUserDto(user);
  }


  private async createToken(userDto: UserDto) {
    const secret = this.configService.get<string>('SECRET');

    if (!secret) {
      throw new HttpException('No Secret in token', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const accessToken = sign({
      email: userDto.email,
      nickname: userDto.nickname
    },secret);
    return accessToken;
  }

  private async storeTokenInWhiteList(email: string, token: string) {
    const result = await this.cacheService.sadd(email, token);
    if (!result)
      throw new HttpException(
        'Cant store token in white list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  public async isTokenInWhiteList(email: string, token: string) {
    const whiteList = await this.cacheService.smembers(email);
    return whiteList.includes(token);
  }
}
