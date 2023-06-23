import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto, normalizePagination } from '@/shared';
import { FilesService } from '@/files';
import { SelectMovie } from './types';
import {
	CreateMovieDto,
	UpdateMovieDto,
	RemovePhotosDto,
	MoviePhotoDto,
	MovieWithPhotosDto
} from './dto';
import { MoviePhotosRepository, MovieRepository } from './repository';
import type { Express } from 'express';

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

	async addPhotos(
		params: SelectMovie,
		photos: Express.Multer.File[]
	): Promise<MovieWithPhotosDto> {
		// Test that movie exists
		await this.getOne(params);
		const filesPaths = await Promise.all(
			photos.map((photo) => this.filesService.writeFile(photo))
		);
		await this.moviePhotosRepository.addPhotos({
			movieId: params.id,
			photos: filesPaths,
		});

		return this.getOne(params);
	}

	async removePhotos(
		params: SelectMovie,
		dto: RemovePhotosDto
	): Promise<MovieWithPhotosDto> {
		const photos = await this.moviePhotosRepository.getAllByMovie({
			movieId: params.id,
		});
		const photosMap = photos.reduce((acc, photo) => {
			acc[photo.id] = photo;
			return acc;
		}, {} as Record<number, MoviePhotoDto>);

		const removeRequests = dto.photosIds.map(async (id) => {
			const photo = photosMap[id];
			if (!photo) {
				throw new NotFoundException(
					`There is not photo with id ${id} in movie with id ${params.id}`
				);
			}

			await this.moviePhotosRepository.removePhoto({
				movieId: params.id,
				photoId: id,
			});
			await this.filesService.removeFile(
				this.filesService.toFileSystemPath(photo.path)
			);
		});

		await Promise.all(removeRequests);

		return this.getOne(params);
	}

	async remove(params: SelectMovie): Promise<boolean> {
		const removed = await this.movieRepository.remove(params);

		if (!removed) {
			throw new NotFoundException(`Movie with id ${params.id} not found`);
		}

		return removed;
	}
}
