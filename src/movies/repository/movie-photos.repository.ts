import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { AddPhotos, RemovePhotos } from '../types';

@Injectable()
export class MoviePhotosRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async addPhotos(dto: AddPhotos): Promise<boolean> {
		const { count, } = await this.databaseService.moviePhotos.createMany({
			data: dto.photos.map((photo) => ({
				path: photo,
				movieId: dto.movieId,
			})),
			skipDuplicates: true,
		});
		return !!count;
	}

	async removePhotos(dto: RemovePhotos): Promise<boolean> {
		const { count, } = await this.databaseService.moviePhotos.deleteMany({
			where: {
				movieId: dto.movieId,
				id: {
					in: dto.photosIds,
				},
			},
		});
		return !!count;
	}
}
