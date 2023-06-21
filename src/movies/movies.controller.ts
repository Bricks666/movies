import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	Put,
	HttpStatus,
	Query
} from '@nestjs/common';
import {
	ApiBody,
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { PaginationDto } from '@/shared';
import { RequiredAuth } from '@/auth';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDto } from './dto';

@ApiTags('Фильмы')
@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@ApiOperation({
		summary: 'Вернуть все фильмы',
	})
	@ApiResponse({
		type: MovieDto,
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
		type: Number,
	})
	@ApiResponse({
		type: MovieDto,
	})
	@ApiNotFoundResponse()
	@Get('/:id')
	getOne(@Param('id', ParseIntPipe) id: number) {
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
		type: MovieDto,
		status: HttpStatus.CREATED,
	})
	@RequiredAuth()
	@Post('/')
	create(@Body() dto: CreateMovieDto) {
		return this.moviesService.create(dto);
	}

	@ApiOperation({
		summary: 'Изменить данные о фильме',
	})
	@ApiParam({
		name: 'id',
		type: Number,
	})
	@ApiBody({
		type: UpdateMovieDto,
		description: 'Новые данные фильма фильма',
	})
	@ApiResponse({
		type: MovieDto,
		status: HttpStatus.OK,
	})
	@RequiredAuth()
	@ApiNotFoundResponse()
	@Put('/:id')
	update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update({ id, }, dto);
	}

	@ApiOperation({
		summary: 'Изменить данные о фильме',
	})
	@ApiParam({
		name: 'id',
		type: Number,
	})
	@ApiResponse({
		type: Boolean,
		status: HttpStatus.OK,
	})
	@RequiredAuth()
	@ApiNotFoundResponse()
	@Delete('/:id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.moviesService.remove({ id, });
	}
}
