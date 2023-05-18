import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDTO } from './dto/movie.dto';
import { UsersDto } from '../users/dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search')
  async searchMovie(@Query('search') search: string): Promise<string> {
    return this.movieService.GetMoviesByTitle(search);
  }

  //database
  @UseGuards(JwtAuthGuard)
  @Post('add-to-my-library')
  addMovieToLibrary(@Body() movie: MovieDTO): Promise<string> {
    return this.movieService.addMovie(movie);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list-my-library')
  listMyLibrary(): Promise<MovieDTO[]> {
    const response = this.movieService.listMyLibrary();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put('review-movie')
  //receive imdbID and userRating in body
  reviewMovie(
    @Query('imdbID') imdbID: string,
    @Query('review') review: number,
  ): Promise<string> {
    return this.movieService.reviewMovie(imdbID, review);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-from-my-library')
  removeMovieFromLibrary(@Query('imdbID') imdbID: string): Promise<string> {
    return this.movieService.removeMovie(imdbID);
  }
}
