import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto';
import { SelectUser } from '../types';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getOne(params: SelectUser): Promise<UserDto | null> {
		return this.databaseService.user.findUnique({
			where: params,
		});
	}

	async create(data: CreateUserDto): Promise<UserDto | null> {
		return this.databaseService.user
			.create({
				data,
			})
			.catch(() => null);
	}

	async update(
		params: SelectUser,
		data: UpdateUserDto
	): Promise<UserDto | null> {
		return this.databaseService.user
			.update({
				where: params,
				data,
			})
			.then((value) => value ?? null)
			.catch(() => null);
	}

	async remove(params: SelectUser): Promise<boolean> {
		return this.databaseService.user
			.delete({
				where: params,
			})
			.then(() => true)
			.catch(() => false);
	}
}
