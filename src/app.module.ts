import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
