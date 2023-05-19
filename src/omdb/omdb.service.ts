import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OmdbService {
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
}
