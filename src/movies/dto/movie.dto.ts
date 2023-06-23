import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';
import { MoviePhotoDto } from './movie-photo.dto';

export class MovieDto implements Movie {
	@ApiProperty({
		type: Number,
		description: 'ID фильма',
	})
	declare id: number;

	@ApiProperty({
		type: String,
		description: 'Название фильма',
	})
	declare title: string;

	@ApiProperty({
		type: String,
		description: 'Описание фильма',
	})
	declare description: string;

	@ApiProperty({
		type: MoviePhotoDto,
		isArray: true,
		description: 'Фотографии фильма',
	})
	declare photos: MoviePhotoDto[];
}
