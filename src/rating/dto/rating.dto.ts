import { ApiProperty } from '@nestjs/swagger';

export class RatingDto {
	@ApiProperty({})
	declare userId: number;

	@ApiProperty({})
	declare movieId: number;

	@ApiProperty({})
	declare mark: number;
}
