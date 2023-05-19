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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a movie to my library' })
  @Post()
  addMovieToLibrary(
    @Body() movie: MovieDTO,
    @Req() request: any,
  ): Promise<string> {
    const user = request.user;
    return this.movieService.addMovieToLibrary(movie, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all movies in my library' })
  @Get()
  listMyLibrary(@Req() request: any): Promise<MovieDTO[]> {
    const user = request.user;
    const response = this.movieService.listMyLibrary(user);
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
