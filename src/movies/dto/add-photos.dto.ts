import { ApiProperty } from '@nestjs/swagger';
import type { Express } from 'express';

export class AddPhotosDto {
	@ApiProperty({
		type: String,
		format: 'binary',
		isArray: true,
	})
	declare photos: Express.Multer.File[];
}
