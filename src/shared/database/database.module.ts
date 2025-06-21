import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceOptions } from 'typeorm';

import { DatabaseConfig } from './configs';
import { Project } from './entities/projects/projects.entity';
import { User } from './entities/users/user.entity';
import { REPOSITORIES } from './repositories';

const entities = [User, Project];
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: (config: DatabaseConfig) => {
        const connection: DataSourceOptions = {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          migrationsTableName: 'migrations',
          entities: [`dist/shared/database/entities/**/*.entity.js`],
          migrations: [`dist/shared/database/migrations/**/*-migration.js`],
          logging: ['error'],
          maxQueryExecutionTime: 100,
          synchronize: false,
        };
        return {
          ...connection,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [DatabaseConfig, ...REPOSITORIES],
  exports: [DatabaseConfig, ...REPOSITORIES],
})
export class DatabaseModule {}
