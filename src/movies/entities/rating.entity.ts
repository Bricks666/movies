import { ApiProperty } from '@nestjs/swagger';
import { Rating as RatingModel } from '@prisma/client';

export class Rating implements RatingModel {
	@ApiProperty({})
	declare userId: number;

	@ApiProperty({})
	declare movieId: number;

	@ApiProperty({})
	declare mark: number;
}
