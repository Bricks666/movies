import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { NormalizedPagination } from '@/shared';
import { CreateMovieDto, MovieDto, UpdateMovieDto } from '../dto';
import { SelectMovie } from '../types';

@Injectable()
export class MovieRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(pagination: NormalizedPagination): Promise<MovieDto[]> {
		return this.databaseService.movie.findMany({
			skip: pagination.offset,
			take: pagination.limit,
		});
	}

	async getOne(params: SelectMovie): Promise<MovieDto | null> {
		return this.databaseService.movie
			.findUnique({
				where: {
					id: params.id,
				},
			})
			.then((value) => value ?? null);
	}

	async create(params: CreateMovieDto): Promise<MovieDto> {
		return this.databaseService.movie.create({
			data: params,
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
			})
			.then((value) => value ?? null);
	}

	async remove(params: SelectMovie): Promise<boolean> {
		return this.databaseService.movie
			.delete({
				where: {
					id: params.id,
				},
			})
			.then((value) => !!value);
	}
}
