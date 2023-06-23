import { ApiProperty } from '@nestjs/swagger';
import { MoviePhotos } from '@prisma/client';
import { IsMongoId } from 'class-validator';

export class MoviePhotoDto implements Omit<MoviePhotos, 'movieId'> {
	@ApiProperty({
		type: Number,
		description: 'ID привязки фото к фильму',
	})
	@IsMongoId()
	declare id: string;

	@ApiProperty({
		type: String,
		description: 'Путь для получения изображения с клиента',
	})
	declare path: string;
}
