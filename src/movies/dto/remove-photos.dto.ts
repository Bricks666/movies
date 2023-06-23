import { ApiProperty } from '@nestjs/swagger';

export class RemovePhotosDto {
	@ApiProperty({
		type: String,
		isArray: true,
		description: 'Id фотографий для удаления',
	})
	readonly photosIds: string[];
}
