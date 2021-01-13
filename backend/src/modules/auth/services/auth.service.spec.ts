import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../../modules/cache/services/cache.service';
import { UserService } from '../../../modules/user/services/user.service';
import { RedisService } from 'nestjs-redis';
import { UserEntity } from '../../user/models/user.entity'
import { AuthService } from '../services/auth.service'
import * as bcrypt from 'bcrypt'
import { toUserDto } from 'src/utils/toUsersDto';

const userOne = new UserEntity({ nickname: 'one', email: "mail.ru", password: 'root' })
const userTwo = new UserEntity({ nickname: 'two', email: "gmail.com", password: 'root' })
const userOneEncrypted = new UserEntity({ nickname: 'one', email: "mail.ru", password: bcrypt.hashSync('root', 10) })
const userOneDto = toUserDto(userOne)

const usersArray = [userOne, userTwo]
describe('The AuthenticationService', () => {
  let authService: AuthService;
  beforeEach(async () => {

    const mockRedis = {
      sadd: jest.fn().mockResolvedValue(1),
      smembers: jest.fn().mockResolvedValue(['123', '321'])
    };

    const mockRedisService = {
      getClient: jest.fn(() => mockRedis),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get(key: string) {
              switch (key) {
                case 'SECRET':
                  return 'defaultsecret'
              }
            }
          }
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userOneEncrypted),
            find: jest.fn().mockResolvedValue(usersArray),
            save: jest.fn().mockResolvedValue(userOne),
            create: jest.fn().mockResolvedValue(userOne)
          }
        },

        { provide: RedisService, useValue: mockRedisService },
        CacheService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  })
  it('should be defined', () => {
    return expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should not register user', () => {
      return expect(authService.register(userOne)).rejects.toThrow('Found user with this email.')
    })
  })

  describe('login', () => {
    it('should success validate and return user', () => {
      return expect(authService.validateUser(userOne.email, userOne.password)).resolves.toEqual(userOneDto)
    })

    it('should success login user and return token', () => {
      return expect(authService.login(userOne)).resolves.toHaveProperty('token')
    })
  })


});
