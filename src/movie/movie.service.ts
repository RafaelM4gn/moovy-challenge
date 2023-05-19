import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDTO } from './dto/movie.dto';
import { UserEntity } from '../users/entities/user.entity';
import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';

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

  //TODO remove from here
  async GetMoviesByTitle(search: string): Promise<any> {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=ce2fada4`;
    try {
      const response = await axios.get<{ Search: any }>(url);
      const { data } = response;
      if (data.Search) {
        const movies = data.Search;
        const movieWithRatings = await Promise.all(
          movies.map(async (movie) => {
            const { Title, Poster, imdbID } = movie;
            const imdbRating = await this.getImdbRating(imdbID);

            return {
              imdbID: imdbID,
              title: Title,
              poster: Poster,
              imdbRating: imdbRating,
            };
          }),
        );
        return movieWithRatings;
      } else {
        return 'No movies found';
      }
    } catch (error) {
      console.log('cannot get movies', error);
      return 'Cannot get movies';
    }
  }

  //not route
  async getImdbRating(imdbID: string): Promise<string> {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=ce2fada4`;
    try {
      const response = await axios.get(url);
      const { data } = response;
      return data.imdbRating;
    } catch (error) {
      console.log('cannot get imdb rating', error);
      return 'N/A';
    }
  }

  async addMovieToLibrary(movie: MovieDTO, user: any): Promise<string> {
    //get user
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    // check if movie exists if not create it
    let movieExists = await this.movieRepository.findOne({
      imdbID: movie.imdbID,
    });

    if (!movieExists) {
      const movieTemp = this.movieRepository.create(movie);
      movieExists = await this.movieRepository.save(movieTemp);
    }

    //check if this movieLibrary already exists
    const movieLibraryExists = await this.movieLibraryRepository.findOne({
      movie: movieExists,
      user: userOwner,
    });

    if (movieLibraryExists) {
      return 'Movie already in library';
    }

    const movieLibrary = this.movieLibraryRepository.create({
      movie: movieExists,
      user: userOwner,
    });

    await this.movieLibraryRepository.save(movieLibrary);
    return 'Movie added to library';
  }

  async listMyLibrary(user: any): Promise<MovieDTO[]> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    //list all movies of this user then return
    const movieLibrary = await this.movieLibraryRepository.find({
      where: { user: userOwner },
      relations: ['movie'],
    });

    const movies = movieLibrary.map((movie) => {
      const { imdbID, title, poster, imdbRating, userRating } = movie.movie;
      return {
        imdbID: imdbID,
        title: title,
        poster: poster,
        imdbRating: imdbRating,
        userRating: userRating,
      };
    });

    return movies;
  }

  async removeMovie(imdbID: string): Promise<string> {
    const total = await this.movieRepository.count();
    if (total === 0) {
      return 'No movies in library';
    }
    const result = await this.movieRepository.delete({
      imdbID: imdbID,
    });

    if (result.affected === 0) {
      return 'Movie not found in library';
    }
    return 'Movie removed from library';
  }

  async reviewMovie(imdbID: string, review: number): Promise<string> {
    const movieExists = await this.movieRepository.findOne({
      imdbID: imdbID,
    });
    if (!movieExists) {
      return 'Movie not found in library';
    }
    if (review < 0 || review > 5) {
      return 'Invalid rating';
    }
    movieExists.userRating = review;
    await this.movieRepository.save(movieExists);
    return 'Movie reviewed';
  }
}
