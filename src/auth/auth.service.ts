import {
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto, SecurityUserDto, UsersService } from '@/users';
import { AuthResponseDto, LoginDto, TokensDto } from './dto';
import { TokenParams } from './types';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async auth(dto: TokenParams): Promise<AuthResponseDto> {
		const authUser = await this.extractUser(dto);
		// For updating info in token it may be changed between generates
		const user = await this.usersService.getOne({ id: authUser.id, });
		const tokens = await this.#generateTokens(user);

		return {
			user,
			tokens,
		};
	}

	async login(dto: LoginDto): Promise<AuthResponseDto> {
		const user = await this.usersService.getInsecure({ login: dto.login, });

		const validPassword = await compare(dto.password, user.password);

		if (!validPassword) {
			throw new UnauthorizedException('Invalid password');
		}

		const tokens = await this.#generateTokens(user);

		return {
			tokens,
			user,
		};
	}

	async registration(dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.usersService.create(dto);
	}

	async refresh(dto: TokenParams): Promise<TokensDto> {
		try {
			const user = await this.extractUser(dto);

			return this.#generateTokens(user);
		} catch (error) {
			throw new ForbiddenException('Invalid token');
		}
	}

	async extractUser(dto: TokenParams): Promise<SecurityUserDto> {
		const { token, } = dto;

		try {
			// 'Cause function return data and token's info
			const user = await this.jwtService.verifyAsync(token, {
				secret: process.env.SECRET,
			});

			return {
				id: user.id,
				login: user.logig,
			};
		} catch (error) {
			throw new UnauthorizedException('Jwt expired', { cause: error, });
		}
	}

	async #generateTokens(user: SecurityUserDto): Promise<TokensDto> {
		const accessToken = this.jwtService.signAsync(user, {
			expiresIn: '30m',
			secret: process.env.SECRET,
		});

		const refreshToken = this.jwtService.signAsync(user, {
			expiresIn: '30d',
			secret: process.env.SECRET,
		});

		const tokens = await Promise.all([accessToken, refreshToken]);

		return {
			accessToken: tokens[0],
			refreshToken: tokens[1],
		};
	}
}
