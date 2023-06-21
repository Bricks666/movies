import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { SelectMovie } from './types';
import { MovieDto } from './dto';
import { MovieRepository } from './repository';

@Injectable()
export class MoviesService {
	constructor(private readonly movieRepository: MovieRepository) {}

	async getAll(): Promise<MovieDto[]> {
		return this.movieRepository.getAll();
	}

	async getOne(params: SelectMovie): Promise<MovieDto> {
		const movie = await this.movieRepository.getOne(params);

		if (!movie) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return movie;
	}

	async create(dto: CreateMovieDto): Promise<MovieDto> {
		return this.movieRepository.create(dto);
	}

	async update(params: SelectMovie, dto: UpdateMovieDto): Promise<MovieDto> {
		const movie = await this.movieRepository.update({ ...dto, ...params });

		if (!movie) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return movie;
	}

	async remove(params: SelectMovie): Promise<boolean> {
		const removed = await this.movieRepository.remove(params);

		if (!removed) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return removed;
	}
}
