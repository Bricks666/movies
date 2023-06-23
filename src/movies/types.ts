import { CreateMovieDto, RemovePhotosDto } from './dto';

export interface SelectMovie {
	readonly id: number;
}

export interface SelectMoviePhoto {
	readonly movieId: number;
}

export interface CreateMovie extends Omit<CreateMovieDto, 'photos'> {
	readonly photos?: string[];
}

export interface AddPhotos {
	readonly movieId: number;
	readonly photos: string[];
}

export interface RemovePhotos extends RemovePhotosDto {
	readonly movieId: number;
}

export interface RemovePhoto {
	readonly movieId: number;
	readonly photoId: number;
}
