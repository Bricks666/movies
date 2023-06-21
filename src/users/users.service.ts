import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	getAll() {
		return `This action returns all users`;
	}

	getOne(id: number) {
		return `This action returns a #${id} user`;
	}

	create(dto: CreateUserDto) {
		return 'This action adds a new user';
	}

	update(id: number, dto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
