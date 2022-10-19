import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/middleware/strategies/jwt.strategy';
import { HashUtils } from 'src/common/utils/hash';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PassportModule,
],
  controllers: [UsersController],
  providers: [
    UsersService, 
    UsersRepository, 
    ...UsersProviders,
    JwtStrategy,
    HashUtils,
  ]
})
export class UsersModule {}
