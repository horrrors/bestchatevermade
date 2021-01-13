
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../../modules/cache/cache.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './services/local.strategy';

@Module({
    imports: [UserModule, ConfigModule, CacheModule],
    controllers: [AuthController,],
    providers: [AuthService, LocalStrategy,],
    exports: [AuthService, LocalStrategy,],
})
export class AuthModule { }
