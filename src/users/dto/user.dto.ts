import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDto implements User {
	@ApiProperty({
		type: Number,
		title: 'ID',
		description: 'Идентификатор пользователя',
	})
	declare id: number;

	@ApiProperty({
		type: String,
		title: 'Логин',
		description: 'Логин пользователя',
	})
	declare login: string;

	@ApiProperty({
		type: String,
		title: 'Пароль',
		description: 'пароль пользователя',
	})
	declare password: string;
}
