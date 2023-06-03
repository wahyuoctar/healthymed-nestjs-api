import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('upload', 'user');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
