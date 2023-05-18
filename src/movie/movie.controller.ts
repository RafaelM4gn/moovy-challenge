import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDTO } from './dto/movie.dto';
import { UsersDto } from '../users/dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Search for a movie' })
  @ApiOkResponse({
    description: 'A list of all movies found with given substring in title',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({ name: 'search', required: true })
  @Get('search')
  async searchMovie(@Query('search') search: string): Promise<any> {
    return this.movieService.GetMoviesByTitle(search);
  }

  //database
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a movie to my library' })
  @Post()
  addMovieToLibrary(
    @Body() movie: MovieDTO,
    @Req() request: any,
  ): Promise<string> {
    const user = request.user;
    return this.movieService.addMovie(movie);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all movies in my library' })
  @Get()
  listMyLibrary(): Promise<MovieDTO[]> {
    const response = this.movieService.listMyLibrary();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Review a movie' })
  @Put('review')
  //receive imdbID and userRating in body
  reviewMovie(
    @Query('imdbID') imdbID: string,
    @Query('review') review: number,
  ): Promise<string> {
    return this.movieService.reviewMovie(imdbID, review);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove a movie from my library' })
  @Delete()
  removeMovieFromLibrary(@Query('imdbID') imdbID: string): Promise<string> {
    return this.movieService.removeMovie(imdbID);
  }
}
