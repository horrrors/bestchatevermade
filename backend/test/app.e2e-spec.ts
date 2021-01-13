import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/modules/user/dto/user.dto';
import { LoginDto } from '../src/modules/auth/dto/auth.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // jest.setTimeout(10000);

  });

  const user: CreateUserDto = {
    nickname: 'horrors',
    email: 'horrors973@gmail.com',
    password: 'truepassword'
  }

  describe('/auth', () => {
    it('/auth/register (POST) should register user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .set('Accept', "/application\/json/")
        .send(user)
        .expect(201)
    });

    it('/auth/login (POST) should login user', () => {
      const loginDto: LoginDto = {
        email: user.email,
        password: user.password
      }
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', "/application\/json/")
        .send(loginDto)
        .expect(201)
    })

    it('/auth/login (POST) should not login user', () => {
      const wrongLoginDto: LoginDto = {
        email: user.email,
        password: 'wrongpassword'
      }
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', "/application\/json/")
        .send(wrongLoginDto)
        .expect(401)
    })


    it('/auth/register (POST) should not register user', () => {
      return request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', "/application\/json/")  
      .send(user)
      .expect(409)
    });

    afterAll(async () => {
      await app.close();
    });
  
  
  })





});
