declare namespace NodeJS {
	interface ProcessEnv {
		readonly SECRET: string;
		readonly PORT: number;
	}

	interface Process {
		env: ProcessEnv;
	}
}
