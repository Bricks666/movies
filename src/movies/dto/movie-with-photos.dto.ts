import { ApiProperty } from '@nestjs/swagger';
import { Movie, MoviePhoto } from '../entities';

export class MovieWithPhotosDto extends Movie {
	@ApiProperty({
		type: MoviePhoto,
		isArray: true,
		description: 'Фотографии фильма',
	})
	declare photos: MoviePhoto[];
}
