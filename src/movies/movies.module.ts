import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import {
	MoviePhotosRepository,
	MovieRepository,
	RatingRepository
} from './repository';

@Module({
	controllers: [MoviesController],
	providers: [
		MoviesService,
		MovieRepository,
		MoviePhotosRepository,
		RatingRepository
	],
	imports: [AuthModule],
})
export class MoviesModule {}
