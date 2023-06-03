import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeExceptionFilter } from './common/filters/sequelize-exception.filter';
import { Role } from './roles/models/roles.models';
import { User } from './users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        DATABASE_DIALECT: Joi.string()
          .valid(
            'mysql',
            'postgres',
            'sqlite',
            'mariadb',
            'mssql',
            'db2',
            'snowflake',
          )
          .default('postgres'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().default('postgres'),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
      expandVariables: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get('DATABASE_DIALECT'),
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true,
        models: [Role, User],
      }),
      inject: [ConfigService],
    }),
    RolesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SequelizeExceptionFilter,
    },
  ],
})
export class AppModule {}
