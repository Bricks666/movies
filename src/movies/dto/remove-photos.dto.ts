import { ApiProperty } from '@nestjs/swagger';

export class RemovePhotosDto {
	@ApiProperty({
		type: Number,
		isArray: true,
	})
	readonly photosIds: number[];
}
