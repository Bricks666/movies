import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export class MovieDto implements Movie {
	@ApiProperty({
		type: Number,
		title: 'id',
		description: 'ID фильма',
	})
	declare id: number;

	@ApiProperty({
		type: String,
		title: 'title',
		description: 'Название фильма',
	})
	declare title: string;

	@ApiProperty({
		type: String,
		title: 'description',
		description: 'Описание фильма',
	})
	declare description: string;
}
