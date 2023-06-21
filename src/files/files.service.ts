import { extname, join, resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import {
	Inject,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { ROUND_COUNT } from '@/shared';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './files.module-definition';
import type { Express } from 'express';
import type { FilePaths } from './types';

@Injectable()
export class FilesService {
	#dir: string;

	#clientPath: string;

	constructor(@Inject(MODULE_OPTIONS_TOKEN) options: typeof OPTIONS_TYPE) {
		this.#dir = options.dir;
		this.#clientPath = options.clientPath;
	}

	async writeFile(file: Express.Multer.File): Promise<FilePaths> {
		try {
			const fileName =
				(await hash(file.originalname, ROUND_COUNT)) +
				extname(file.originalname);

			const fileSystemPath = this.getFileSystemPath(fileName);
			const servePath = this.getServePath(fileName);

			await writeFile(fileSystemPath, file.buffer);

			return {
				servePath,
				fileSystemPath,
			};
		} catch (error) {
			throw new InternalServerErrorException('Write file error', {
				cause: error,
			});
		}
	}

	getFileSystemPath(fileName: string): string {
		return resolve(this.#dir, fileName);
	}

	getServePath(fileName: string): string {
		return resolve(this.#clientPath, fileName);
	}

	toFileSystemPath(servePath: string): string {
		return join(this.#dir, servePath.replace(this.#clientPath, ''));
	}

	toServePath(fileSystemPath: string): string {
		return join(this.#clientPath, fileSystemPath.replace(this.#dir, ''));
	}
}
