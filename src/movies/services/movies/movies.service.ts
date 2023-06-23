import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto, normalizePagination } from '@/shared';
import { FilesService } from '@/files';
import { CreateMovieDto, UpdateMovieDto, MovieWithPhotosDto } from '../../dto';
import { MoviePhotosRepository, MovieRepository } from '../../repositories';
import type { Express } from 'express';
import type { SelectMovie } from './types';

@Injectable()
export class MoviesService {
	constructor(
		private readonly movieRepository: MovieRepository,
		private readonly filesService: FilesService,
		private readonly moviePhotosRepository: MoviePhotosRepository
	) {}

	async getAll(pagination: PaginationDto): Promise<MovieWithPhotosDto[]> {
		const normalizedPagination = normalizePagination(pagination, {
			count: 10,
			page: 1,
		});
		const movies = await this.movieRepository.getAll(normalizedPagination);

		const moviesWithPhotos = movies.map(
			async (movie): Promise<MovieWithPhotosDto> => {
				const photos = await this.moviePhotosRepository.getAllByMovie({
					movieId: movie.id,
				});

				return {
					...movie,
					photos,
				};
			}
		);

		return Promise.all(moviesWithPhotos);
	}

	async getOne(params: SelectMovie): Promise<MovieWithPhotosDto> {
		const movie = await this.movieRepository.getOne(params);

		if (!movie) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		const photos = await this.moviePhotosRepository.getAllByMovie({
			movieId: movie.id,
		});

		return {
			...movie,
			photos,
		};
	}

	async create(
		dto: CreateMovieDto,
		photos: Express.Multer.File[]
	): Promise<MovieWithPhotosDto> {
		const filesPaths = await Promise.all(
			photos.map((photo) => this.filesService.writeFile(photo))
		);
		const movie = await this.movieRepository.create({
			...dto,
			photos: filesPaths,
		});
		return this.getOne({ id: movie.id, });
	}

	async update(
		params: SelectMovie,
		dto: UpdateMovieDto
	): Promise<MovieWithPhotosDto> {
		const movie = await this.movieRepository.update({ ...dto, ...params, });

		if (!movie) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return this.getOne({ id: movie.id, });
	}

	async remove(params: SelectMovie): Promise<boolean> {
		const removed = await this.movieRepository.remove(params);

		if (!removed) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return removed;
	}
}
