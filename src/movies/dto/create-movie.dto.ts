import {
	IntersectionType,
	OmitType,
	PartialType,
	PickType
} from '@nestjs/swagger';
import { Movie } from '../entities';

export class CreateMovieDto extends IntersectionType(
	OmitType(Movie, ['id', 'rating', 'photos']),
	PartialType(PickType(Movie, ['photos'] as const))
) {}
