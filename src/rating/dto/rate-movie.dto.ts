import { OmitType } from '@nestjs/swagger';
import { RatingDto } from './rating.dto';

export class RateMovieDto extends OmitType(RatingDto, ['userId']) {}
