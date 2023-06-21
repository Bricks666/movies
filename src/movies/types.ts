import { CreateMovieDto } from './dto';

export interface SelectMovie {
	readonly id: number;
}

export interface CreateMovie extends Omit<CreateMovieDto, 'photos'> {
	readonly photos?: string[];
}
