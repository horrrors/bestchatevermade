import { CacheService } from './services/cache.service';
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => configService.get('REDIS'),
            inject: [ConfigService]
        }),],
    controllers: [],
    providers: [
        CacheService,],
    exports: [CacheService]
})
export class CacheModule { }
