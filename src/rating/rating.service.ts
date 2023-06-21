import { Injectable } from '@nestjs/common';
import { RateMovie } from './types';
import { RatingRepository } from './repository';

@Injectable()
export class RatingService {
	constructor(private readonly ratingRepository: RatingRepository) {}

	create(dto: RateMovie) {
		return this.ratingRepository.create(dto);
	}
}
