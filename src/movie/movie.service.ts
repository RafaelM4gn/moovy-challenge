import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  //methods

  async GetMoviesByTitle(search: string): Promise<any> {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=ce2fada4`;
    try {
      const response = await axios.get(url);
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

  async addMovie(movie: MovieDTO): Promise<string> {
    //check if exists by imdbID
    const movieExists = await this.movieRepository.findOne({
      imdbID: movie.imdbID,
    });
    if (movieExists) {
      return 'Movie already in library';
    }
    await this.movieRepository.save(movie);
    return 'Movie added to library';
  }

  async listMyLibrary(): Promise<MovieDTO[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => ({
      imdbID: movie.imdbID,
      title: movie.title,
      poster: movie.poster,
      imdbRating: movie.imdbRating,
      userRating: movie.userRating,
    }));
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
