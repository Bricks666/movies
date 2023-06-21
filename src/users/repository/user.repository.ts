import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}
}
