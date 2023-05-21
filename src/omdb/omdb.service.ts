import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MovieListDto } from './dto/movieList.dto';
import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
import { MovieEntity } from 'src/movie/movie.entity';

@Injectable()
export class OmdbService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositorty: Repository<UserEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(MovieLibraryEntity)
    private readonly movieLibraryRepository: Repository<MovieLibraryEntity>,
  ) {}
  async GetMoviesByTitle(
    search: string,
    user: UserDto,
  ): Promise<MovieListDto[]> {
    const userOwner = await this.userRepositorty.findOne({
      username: user.username,
    });

    const url = `http://www.omdbapi.com/?s=${search}&apikey=ce2fada4`;
    const response = await axios.get<{ Search: any }>(url);
    const { data } = response;

    if (data.Search) {
      const movies = data.Search;
      const movieWithRatings = await Promise.all(
        movies.map(async (movie): Promise<MovieListDto> => {
          const { Title, Poster, imdbID } = movie;
          const imdbRating = await this.getImdbRating(imdbID);

          const movieExists = await this.movieRepository.findOne({
            imdbID: imdbID,
          });

          const userHasMOvie = await this.movieLibraryRepository.findOne({
            movie: movieExists,
            user: userOwner,
          });

          return {
            imdbID: imdbID,
            title: Title,
            poster: Poster,
            imdbRating: parseFloat(imdbRating),
            userHasMovie: userHasMOvie ? true : false,
          };
        }),
      );
      return movieWithRatings;
    } else {
      return [];
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
}
