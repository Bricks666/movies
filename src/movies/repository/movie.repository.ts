import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { NormalizedPagination } from '@/shared';
import { MovieDto, UpdateMovieDto } from '../dto';
import { CreateMovie, SelectMovie } from '../types';

@Injectable()
export class MovieRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(pagination: NormalizedPagination): Promise<MovieDto[]> {
		return this.databaseService.movie.findMany({
			skip: pagination.offset,
			take: pagination.limit,
			select: movieSelect,
		});
	}

	async getOne(params: SelectMovie): Promise<MovieDto | null> {
		return this.databaseService.movie
			.findUnique({
				where: {
					id: params.id,
				},
				select: movieSelect,
			})
			.then((value) => value ?? null);
	}

	async create(params: CreateMovie): Promise<MovieDto> {
		const { photos, ...rest } = params;
		return this.databaseService.movie.create({
			data: {
				...rest,
				photos: {
					createMany: {
						data: photos.map((photo) => ({ path: photo, })),
					},
				},
			},
			select: movieSelect,
		});
	}

	async update(params: SelectMovie & UpdateMovieDto): Promise<MovieDto | null> {
		const { id, ...rest } = params;
		return this.databaseService.movie
			.update({
				data: rest,
				where: {
					id,
				},
				select: movieSelect,
			})
			.then((value) => value ?? null)
			.catch(() => null);
	}

	async remove(params: SelectMovie): Promise<boolean> {
		return this.databaseService.movie
			.delete({
				where: {
					id: params.id,
				},
				select: movieSelect,
			})
			.then(() => true)
			.catch(() => false);
	}
}

const movieSelect = {
	id: true,
	description: true,
	title: true,
	photos: {
		select: {
			id: true,
			path: true,
		},
	},
};
