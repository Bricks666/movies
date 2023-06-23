import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsMongoId } from 'class-validator';

export class UserDto implements User {
	@ApiProperty({
		type: Number,
		title: 'ID',
		description: 'Идентификатор пользователя',
	})
	@IsMongoId()
	declare id: string;

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
