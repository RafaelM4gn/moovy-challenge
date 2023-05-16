import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get('search')
  async searchMovie(@Query('search') search: string): Promise<string> {
    return this.appService.GetMoviesByTitle(search);
  }

  @Get('addMovieToLibrary')
  addMovieToLibrary(): string {
    return 'Hello World!';
  }

  @Get('getMoviesFromLibrary')
  getMoviesFromLibrary(): string {
    return 'Hello World!';
  }
}
