import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export class MovieDto implements Movie {
	@ApiProperty({
		type: Number,
		description: 'ID фильма',
	})
	declare id: number;

	@ApiProperty({
		type: String,
		description: 'Название фильма',
	})
	declare title: string;

	@ApiProperty({
		type: String,
		description: 'Описание фильма',
	})
	declare description: string;

	@ApiProperty({
		type: Number,
		nullable: true,
		description: 'Рейтинг фильма',
	})
	declare rating: number | null;
}
