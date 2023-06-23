import { OmitType } from '@nestjs/swagger';
import { Movie } from '../entities';

export class CreateMovieDto extends OmitType(Movie, ['id', 'rating']) {}
