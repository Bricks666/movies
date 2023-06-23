import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { NormalizedPagination } from '@/shared';
import { MovieDto, UpdateMovieDto } from '../dto';
import { CreateMovie, SelectMovie } from '../types';
import { RawMovie, normalizeMovie } from './lib';

@Injectable()
export class MovieRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(pagination: NormalizedPagination): Promise<MovieDto[]> {
		const raw = await this.databaseService.$queryRaw<
			RawMovie[]
		>`SELECT id, title, description, AVG("mark") as rating FROM "Movie"\
			LEFT JOIN "Rating" ON "Rating"."movieId" = "Movie"."id"\
			GROUP BY "id"\
			OFFSET ${pagination.offset} LIMIT ${pagination.limit};`;

		return raw.map(normalizeMovie);
	}

	async getOne(params: SelectMovie): Promise<MovieDto | null> {
		const raw = await this.databaseService.$queryRaw<
			RawMovie | undefined
		>`SELECT id, title, description, AVG("mark") as rating FROM "Movie"\
		LEFT JOIN "Rating" ON "Rating"."movieId" = "Movie"."id"\
		WHERE "id" = ${params.id}\
		GROUP BY "id";`.then((result) => result[0]);
		return raw ? normalizeMovie(raw) : null;
	}

	async create(params: CreateMovie): Promise<MovieDto> {
		const { photos, ...rest } = params;
		const movie = await this.databaseService.movie.create({
			data: {
				...rest,
				photos: {
					createMany: {
						data: photos.map((photo) => ({ path: photo, })),
					},
				},
			},
			select: {
				id: true,
			},
		});

		return this.getOne({ id: movie.id, });
	}

	async update(params: SelectMovie & UpdateMovieDto): Promise<MovieDto | null> {
		const { id, ...rest } = params;
		const movie = await this.databaseService.movie
			.update({
				data: rest,
				where: {
					id,
				},
				select: {
					id: true,
				},
			})
			.catch(() => null);
		return this.getOne({ id: movie.id, });
	}

	async remove(params: SelectMovie): Promise<boolean> {
		return this.databaseService.movie
			.delete({
				where: {
					id: params.id,
				},
			})
			.then(() => true)
			.catch(() => false);
	}
}
