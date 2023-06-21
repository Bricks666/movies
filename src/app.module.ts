import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { MoviesModule } from './movies';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.local'],
		}),
		DatabaseModule.forRoot({
			isGlobal: true,
		}),
		MoviesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
