import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './users.entity';
import { UserController } from './users.controller';

@Module({
  providers: [UsersService,{
    provide: 'USER_REPOSITORY',
    useValue: user 
  }],
  controllers:[UserController],
  exports: [UsersService],

})
export class UsersModule {}
