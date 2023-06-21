import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Post,
	Res
} from '@nestjs/common';
import { BASE_COOKIE_CONFIG, COOKIE_NAME, Cookie } from '@/shared';
import { CreateUserDto, SecurityUserDto } from '@/users';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, TokensDto } from './dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/')
	async auth(
		@Cookie(COOKIE_NAME) token: string | null,
		@Res({ passthrough: true, }) res: Response
	): Promise<AuthResponseDto> {
		if (!token) {
			throw new ForbiddenException('Token is null');
		}

		const response = await this.authService.auth({ token, });

		res.cookie(COOKIE_NAME, response.tokens.refreshToken, BASE_COOKIE_CONFIG);

		return response;
	}

	@Post('/login')
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true, }) res: Response
	): Promise<AuthResponseDto> {
		const response = await this.authService.login(dto);

		res.cookie(COOKIE_NAME, response.tokens.refreshToken, BASE_COOKIE_CONFIG);

		return response;
	}

	@Post('/registration')
	async registration(@Body() dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.authService.registration(dto);
	}

	@Delete('/logout')
	async logout(@Res({ passthrough: true, }) res: Response): Promise<boolean> {
		res.clearCookie(COOKIE_NAME);
		return true;
	}

	@Get('/refresh')
	async refresh(
		@Cookie(COOKIE_NAME) token: string | null,
		@Res({ passthrough: true, }) res: Response
	): Promise<TokensDto> {
		if (!token) {
			throw new ForbiddenException('Token is null');
		}

		const tokens = await this.authService.refresh({ token, });
		res.cookie(COOKIE_NAME, tokens.refreshToken, BASE_COOKIE_CONFIG);
		return tokens;
	}
}
