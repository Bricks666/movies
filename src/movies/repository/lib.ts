import { MovieDto } from '../dto';

export interface RawMovie {
	readonly id: number;
	readonly title: string;
	readonly description: string;
	readonly rating: string | null;
}

export const normalizeMovie = (movie: RawMovie): MovieDto => {
	return {
		id: movie.id,
		title: movie.title,
		description: movie.description,
		rating: movie.rating ? Number(movie.rating) : null,
	};
};
