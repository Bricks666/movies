import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';
import type { Express } from 'express';

export class CreateMovieDto extends OmitType(MovieDto, ['id']) {
	@ApiProperty({
		type: String,
		format: 'binary',
		isArray: true,
		required: false,
	})
	readonly photos?: Express.Multer.File[];
}
