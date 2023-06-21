import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseIntPipe,
	Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get('/')
	getAll() {
		return this.moviesService.getAll();
	}

	@Post('/')
	create(@Body() dto: CreateMovieDto) {
		return this.moviesService.create(dto);
	}

	@Get('/:id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.moviesService.getOne({ id });
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update({ id }, dto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.moviesService.remove({ id });
	}
}
