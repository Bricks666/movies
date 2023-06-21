export interface SelectUserById {
	readonly id: number;
}

export interface SelectUserByLogin {
	readonly login: string;
}

export type SelectUser = SelectUserById | SelectUserByLogin;
