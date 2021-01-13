import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';


@Injectable()
export class CacheService {
  private _client: Redis.Redis
  constructor(
    private readonly redisService: RedisService
  ) {
    this._client = this.redisService.getClient()
  }

  public async sadd(key: string, value: string): Promise<boolean> {
    const result = await this._client.sadd(key, value)
    return !!result
  }

  public async smembers(key: string) {
    return this._client.smembers(key)
  }



}
