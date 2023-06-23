import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Movie } from '../entities';
import type { Express } from 'express';

export class CreateMovieDto extends OmitType(Movie, ['id', 'rating']) {
	@ApiProperty({
		type: String,
		format: 'binary',
		isArray: true,
		required: false,
		description: 'Фотографии для фильма',
	})
	readonly photos?: Express.Multer.File[];
}
