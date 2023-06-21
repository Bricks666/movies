import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieRepository } from './repository';

@Module({
	controllers: [MoviesController],
	providers: [MoviesService, MovieRepository],
})
export class MoviesModule {}
