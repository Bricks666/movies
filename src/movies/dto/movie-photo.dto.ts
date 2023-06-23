import { ApiProperty } from '@nestjs/swagger';
import { MoviePhotos } from '@prisma/client';

export class MoviePhotoDto implements Omit<MoviePhotos, 'movieId'> {
	@ApiProperty({
		type: Number,
		description: 'ID привязки фото к фильму',
	})
	declare id: number;

	@ApiProperty({
		type: String,
		description: 'Путь для получения изображения с клиента',
	})
	declare path: string;
}
