import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { UserRepository } from './repository';
import { CreateUserDto, SecurityUserDto, UpdateUserDto, UserDto } from './dto';
import { SelectUser } from './types';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOne(params: SelectUser): Promise<SecurityUserDto> {
		const user = await this.userRepository.getOne(params);

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return this.securingUser(user);
	}

	async getInsecure(params: SelectUser): Promise<UserDto> {
		const user = await this.userRepository.getOne(params);

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return user;
	}

	async create(dto: CreateUserDto): Promise<SecurityUserDto> {
		const user = await this.userRepository.create(dto);

		if (!user) {
			throw new ConflictException(`User with this login already exists`);
		}

		return this.securingUser(user);
	}

	async update(
		params: SelectUser,
		dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		const user = await this.userRepository.update(params, dto);

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return this.securingUser(user);
	}

	async remove(params: SelectUser): Promise<boolean> {
		const removed = await this.userRepository.remove(params);

		if (!removed) {
			throw new NotFoundException('User not found');
		}

		return removed;
	}

	securingUser(user: UserDto): SecurityUserDto {
		return {
			id: user.id,
			login: user.login,
		};
	}
}
