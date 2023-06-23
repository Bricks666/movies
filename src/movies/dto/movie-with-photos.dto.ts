import { ApiProperty } from '@nestjs/swagger';
import { MoviePhotoDto } from './movie-photo.dto';
import { MovieDto } from './movie.dto';

export class MovieWithPhotosDto extends MovieDto {
	@ApiProperty({
		type: MoviePhotoDto,
		isArray: true,
		description: 'Фотографии фильма',
	})
	declare photos: MoviePhotoDto[];
}
