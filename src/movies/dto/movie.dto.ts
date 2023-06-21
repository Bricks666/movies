import { Movie } from '@prisma/client';

export class MovieDto implements Movie {
	declare id: number;

	declare title: string;

	declare description: string;
}
