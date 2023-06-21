import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repository';

@Module({
	providers: [UsersService, UserRepository],
})
export class UsersModule {}
