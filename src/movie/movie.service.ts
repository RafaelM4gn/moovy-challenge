import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async GetMoviesByTitle(search: string): Promise<string> {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=ce2fada4`;
    const response = await axios.get(url);
    const { data } = response;

    return data.Search.map((movie) => ({
      title: movie.Title,
      poster: movie.Poster,
      imdbID: movie.imdbID,
    }));

    return response.data;
    // return 'Hello World!';
  }
}
