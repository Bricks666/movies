import { ApiProperty } from '@nestjs/swagger';
import { MoviePhotos } from '@prisma/client';

export class MoviePhotoDto implements Omit<MoviePhotos, 'movieId'> {
	@ApiProperty()
	declare id: number;

	@ApiProperty()
	declare path: string;
}
