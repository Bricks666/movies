import { ApiProperty } from '@nestjs/swagger';

export class RemovePhotosDto {
	@ApiProperty({
		type: Number,
		isArray: true,
		description: 'Id фотографий для удаления',
	})
	readonly photosIds: number[];
}
