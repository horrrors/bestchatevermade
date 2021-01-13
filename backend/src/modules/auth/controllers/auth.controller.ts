import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/modules/user/models/user.entity';
import { User } from 'src/utils/currentUserDecorator';
import { CreateUserDto } from '../../user/dto/user.dto';
import { LoginStatus } from '../interfaces/LoginStatus.interface';
import { RegisterStatus } from '../interfaces/RegisterStatus.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<RegisterStatus> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@User() user: UserEntity): Promise<LoginStatus>  {
    return this.authService.login(user);
  }
}
