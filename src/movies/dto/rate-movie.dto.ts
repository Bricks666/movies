import { PickType } from '@nestjs/swagger';
import { Rating } from '../entities';

export class RateMovieDto extends PickType(Rating, ['mark']) {}
