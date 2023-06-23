import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	HttpStatus,
	Query,
	UseInterceptors,
	UploadedFiles,
	Patch
} from '@nestjs/common';
import {
	ApiBody,
	ApiConflictResponse,
	ApiConsumes,
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser, RequiredAuth } from '@/auth';
import { SecurityUserDto } from '@/users';
import { PaginationDto } from '@/shared';
import {
	AddPhotosDto,
	MovieWithPhotosDto,
	RemovePhotosDto,
	CreateMovieDto,
	UpdateMovieDto,
	RateMovieDto
} from './dto';
import {
	MoviePhotosService,
	MovieRatingService,
	MoviesService
} from './services';
import type { Express } from 'express';

@ApiTags('Фильмы')
@Controller('movies')
export class MoviesController {
	constructor(
		private readonly moviesService: MoviesService,
		private readonly moviePhotosService: MoviePhotosService,
		private readonly movieRatingService: MovieRatingService
	) {}

	@ApiOperation({
		summary: 'Вернуть все фильмы',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		isArray: true,
	})
	@Get('/')
	getAll(@Query() pagination: PaginationDto) {
		return this.moviesService.getAll(pagination);
	}

	@ApiOperation({
		summary: 'Получить один фильм',
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Id фильма',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		description: 'Найденный фильм',
	})
	@ApiNotFoundResponse()
	@Get('/:id')
	getOne(@Param('id') id: string) {
		return this.moviesService.getOne({ id, });
	}

	@ApiOperation({
		summary: 'Добавить фильм',
	})
	@ApiBody({
		type: CreateMovieDto,
		description: 'Данные для создание фильма',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		status: HttpStatus.CREATED,
	})
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('photos'))
	@RequiredAuth()
	@Post('/')
	create(
		@Body() dto: CreateMovieDto,
		@UploadedFiles() photos: Express.Multer.File[]
	) {
		return this.moviesService.create(dto, photos);
	}

	@ApiOperation({
		summary: 'Изменить данные о фильме',
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Id фильма',
	})
	@ApiBody({
		type: UpdateMovieDto,
		description: 'Новые данные фильма фильма',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		status: HttpStatus.OK,
		description: 'Обновленный фильм',
	})
	@RequiredAuth()
	@ApiNotFoundResponse()
	@Put('/:id')
	update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update({ id, }, dto);
	}

	@ApiOperation({
		summary: 'Добавление фото к фильму',
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Id фильма',
	})
	@ApiBody({
		type: AddPhotosDto,
		description: 'Новые данные фильма фильма',
	})
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('photos'))
	@ApiResponse({
		type: MovieWithPhotosDto,
		status: HttpStatus.OK,
	})
	@ApiNotFoundResponse({ description: 'Фильм не найден', })
	@RequiredAuth()
	@Patch('/:id/photos/add')
	addPhotos(
		@UploadedFiles() photos: Express.Multer.File[],
		@Param('id') id: string
	) {
		return this.moviePhotosService.addPhotos({ id, }, photos);
	}

	@ApiOperation({
		summary: 'Удаление фотографий',
	})
	@ApiBody({
		type: RemovePhotosDto,
		description: 'Данные для удаления',
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Id фильма',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		status: HttpStatus.OK,
	})
	@ApiNotFoundResponse({ description: 'Фильм или фото не найдены', })
	@RequiredAuth()
	@Patch('/:id/photos/remove')
	removePhotos(@Param('id') id: string, @Body() dto: RemovePhotosDto) {
		return this.moviePhotosService.removePhotos({ id, }, dto);
	}

	@ApiOperation({
		summary: 'Выставление оценки',
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Id фильма',
	})
	@ApiBody({
		type: RateMovieDto,
		description: 'Данные для оценки',
	})
	@ApiResponse({
		type: MovieWithPhotosDto,
		status: HttpStatus.OK,
		description: 'Обнлвленные данные фильма',
	})
	@ApiNotFoundResponse({ description: 'Фильм не найден', })
	@ApiConflictResponse({
		description: 'Пользователь уже оставил оценку для этого фильма',
	})
	@RequiredAuth()
	@Patch('/:id/rate')
	async rateMovie(
		@Param('id') id: string,
		@CurrentUser() user: SecurityUserDto,
		@Body() dto: RateMovieDto
	) {
		return this.movieRatingService.rate(
			{ id, },
			{
				mark: dto.mark,
				userId: user.id,
			}
		);
	}

	@ApiOperation({
		summary: 'Изменить данные о фильме',
	})
	@ApiParam({
		name: 'id',
		type: String,
	})
	@ApiResponse({
		type: Boolean,
		status: HttpStatus.OK,
	})
	@RequiredAuth()
	@ApiNotFoundResponse()
	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.moviesService.remove({ id, });
	}
}
