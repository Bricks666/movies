import { ApiProperty } from '@nestjs/swagger';
import type { Express } from 'express';

export class AddPhotosDto {
	@ApiProperty({
		type: String,
		format: 'binary',
		isArray: true,
		description: 'Файлы, которые нужно добавить',
	})
	declare photos: Express.Multer.File[];
}
