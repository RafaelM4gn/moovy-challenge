import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { movieDto } from './dto/movie.dto';
import { UserEntity } from '../users/entities/user.entity';
import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { libraryDto } from './dto/library.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepositorty: Repository<UserEntity>,
    @InjectRepository(MovieLibraryEntity)
    private readonly movieLibraryRepository: Repository<MovieLibraryEntity>,
  ) {}

  async addMovieToLibrary(movie: movieDto, user: any): Promise<void> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    let movieExists = await this.movieRepository.findOne({
      imdbID: movie.imdbID,
    });

    if (!movieExists) {
      const movieTemp = this.movieRepository.create(movie);
      movieExists = await this.movieRepository.save(movieTemp);
    }

    const movieLibraryExists = await this.movieLibraryRepository.findOne({
      movie: movieExists,
      user: userOwner,
    });

    if (movieLibraryExists) {
      throw new HttpException('Movie already in library', HttpStatus.CONFLICT);
    }

    const movieLibrary = this.movieLibraryRepository.create({
      movie: movieExists,
      user: userOwner,
    });

    await this.movieLibraryRepository.save(movieLibrary);
    throw new HttpException('Movie added to library', HttpStatus.CREATED);
  }

  async listMyLibrary(user: any): Promise<libraryDto[]> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    const movieLibrary = await this.movieLibraryRepository.find({
      where: { user: userOwner },
      relations: ['movie'],
    });

    const movies = movieLibrary.map((movie) => {
      const { imdbID, title, poster, imdbRating } = movie.movie;
      return {
        imdbID: imdbID,
        title: title,
        poster: poster,
        imdbRating: imdbRating,
        userRating: movie.userRating,
        userHasMovie: true,
      };
    });

    return movies;
  }

  async removeMovie(imdbID: string, user: UserDto): Promise<void> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    const movieExists = await this.movieRepository.findOne({
      imdbID: imdbID,
    });

    const movieLibraryExists = await this.movieLibraryRepository.findOne({
      movie: movieExists,
      user: userOwner,
    });

    if (!movieLibraryExists) {
      throw new HttpException(
        'Movie not found in library',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.movieLibraryRepository.delete(movieLibraryExists.id);
      throw new HttpException('Movie removed', HttpStatus.OK);
    }
  }

  async reviewMovie(
    imdbID: string,
    review: number,
    user: UserDto,
  ): Promise<void> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    const movieExists = await this.movieRepository.findOne({
      imdbID: imdbID,
    });

    if (!movieExists) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    const movieLibraryExists = await this.movieLibraryRepository.findOne({
      movie: movieExists,
      user: userOwner,
    });

    if (!movieLibraryExists) {
      throw new HttpException(
        'Movie not found in library',
        HttpStatus.NOT_FOUND,
      );
    } else {
      if (review < 0 || review > 5) {
        throw new HttpException('Invalid rating', HttpStatus.BAD_REQUEST);
      } else {
        movieLibraryExists.userRating = review;
        await this.movieLibraryRepository.save(movieLibraryExists);
        throw new HttpException('Movie reviewed', HttpStatus.OK);
      }
    }
  }
}
