import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { Rating } from '../entities';

@Injectable()
export class RatingRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(dto: Rating): Promise<Rating> {
		return this.databaseService.rating.create({
			data: dto,
		});
	}
}
