import { ApiProperty } from '@nestjs/swagger';
import { Rating as RatingModel } from '@prisma/client';
import { IsNumber, Max, Min } from 'class-validator';

export class Rating implements RatingModel {
	@ApiProperty({
		type: Number,
		description: 'ID пользователя',
	})
	@IsNumber()
	declare userId: number;

	@ApiProperty({
		type: Number,
		description: 'ID фильма',
	})
	@IsNumber()
	declare movieId: number;

	@ApiProperty({
		type: Number,
		description: 'Оценка',
	})
	@IsNumber()
	@Min(1)
	@Max(10)
	declare mark: number;
}
