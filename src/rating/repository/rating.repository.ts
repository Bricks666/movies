import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { RateMovie } from '../types';

@Injectable()
export class RatingRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(dto: RateMovie): Promise<null | unknown> {
		return this.databaseService.rating
			.create({
				data: dto,
			})
			.catch(() => null);
	}
}
