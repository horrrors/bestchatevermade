import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserService } from '../services/user.service'

const userOne = new UserEntity({ nickname: 'one', email: "mail.ru", password: 'root' })
const userTwo = new UserEntity({ nickname: 'two', email: "gmail.com", password: 'root' })

const usersArray = [userOne, userTwo]

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userOne),
            find: jest.fn().mockResolvedValue(usersArray),
            save: jest.fn().mockResolvedValue(userOne),
            create: jest.fn().mockResolvedValue(userOne)
          }
        },

      ]
    }).compile()

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('findByEmail', () => {
    it('should get one user by emal', async () => {
      const repoSpy = jest.spyOn(repo, 'findOne')
      await expect(service.findByEmail('mail.ru')).resolves.toEqual(userOne)
      await expect(repoSpy).toBeCalledWith({ email: 'mail.ru' })
    })
  })

  describe('createUser', () => {
    it('should success insert a user', () => {
      return expect(service.createUser(userOne)).resolves.toEqual(userOne)
    })
  })



})