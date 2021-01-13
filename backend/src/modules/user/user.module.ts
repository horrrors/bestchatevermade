import { UserController } from './contollers/user.controller';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController,],
    providers: [UserService,],
    exports: [UserService]
})
export class UserModule { }
