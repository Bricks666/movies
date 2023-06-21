import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingRepository } from './repository';

@Module({
	providers: [RatingService, RatingRepository],
	exports: [RatingService],
})
export class RatingModule {}
