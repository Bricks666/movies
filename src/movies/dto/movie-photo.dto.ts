import { MoviePhotos } from '@prisma/client';

export class MoviePhotoDto implements Omit<MoviePhotos, 'movieId'> {
	declare id: number;

	declare path: string;
}
