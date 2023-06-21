import { User } from '@prisma/client';

export class UserDto implements User {
	declare id: number;

	declare login: string;

	declare password: string;
}
