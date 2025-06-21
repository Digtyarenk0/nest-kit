import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';

import Redis from 'ioredis';

type Ok = 'OK';

@Injectable()
export class CacheService {
  private readonly cacheDb: number;
  private readonly logger = new Logger(CacheService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async get<T>(key: string): Promise<T | null> {
    const result = await this.redis.get(key);
    if (result === null) {
      return null;
    }
    try {
      return JSON.parse(result) as T;
    } catch {
      return result as unknown as T;
    }
  }

  public async set(
    key: string,
    value: unknown,
    ttl: number,
  ): Promise<Ok | null> {
    const multi = this.redis.multi().select(this.cacheDb);

    if (ttl > 0) {
      multi.set(key, JSON.stringify(value), 'PX', ttl);
    } else {
      multi.set(key, JSON.stringify(value));
    }

    const execResult = await multi.exec();
    const result = execResult?.[1]?.[1];
    return result === 'OK' ? 'OK' : null;
  }

  public async lock(
    key: string,
    value: string,
    ttl: number,
  ): Promise<Ok | null> {
    return this.redis.set(key, value, 'PX', ttl, 'NX');
  }

  public async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  public async checkHealth() {
    try {
      const response = await this.redis.ping();
      if (response === 'PONG') {
        return {
          status: 'ok',
          redis: 'Redis is available',
        };
      }
      throw new Error('Redis not responding correctly');
    } catch (error) {
      this.logger.error('Redis is not available:', error);
      return {
        status: 'down',
        redis: 'Redis is down',
      };
    }
  }
}
