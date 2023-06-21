import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto, normalizePagination } from '@/shared';
import { FilesService } from '@/files';
import { SelectMovie } from './types';
import { MovieDto, CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieRepository } from './repository';
import type { Express } from 'express';

@Injectable()
export class MoviesService {
	constructor(
		private readonly movieRepository: MovieRepository,
		private readonly filesService: FilesService
	) {}

	async getAll(pagination: PaginationDto): Promise<MovieDto[]> {
		const normalizedPagination = normalizePagination(pagination, {
			count: 10,
			page: 1,
		});
		return this.movieRepository.getAll(normalizedPagination);
	}

	async getOne(params: SelectMovie): Promise<MovieDto> {
		const movie = await this.movieRepository.getOne(params);

		if (!movie) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return movie;
	}

	async create(
		dto: CreateMovieDto,
		photos: Express.Multer.File[]
	): Promise<MovieDto> {
		const filesPaths = await Promise.all(
			photos.map((photo) => this.filesService.writeFile(photo))
		);
		const paths = filesPaths.map((filePaths) => filePaths.servePath);
		return this.movieRepository.create({ ...dto, photos: paths, });
	}

	async update(params: SelectMovie, dto: UpdateMovieDto): Promise<MovieDto> {
		const movie = await this.movieRepository.update({ ...dto, ...params, });

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
