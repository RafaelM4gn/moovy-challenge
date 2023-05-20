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
import { movieDto } from './dto/movie.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all movies in my library' })
  @ApiResponse({ status: 200, description: 'Movies listed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  getMovies(@Req() request: any): Promise<movieDto[]> {
    const user = request.user;
    const response = this.movieService.listMyLibrary(user);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a movie to my library' })
  @ApiResponse({ status: 201, description: 'Movie added to library' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Movie already in library' })
  @ApiBody({ type: movieDto })
  @ApiBearerAuth()
  @Post()
  postMovie(@Body() movie: movieDto, @Req() request: any): Promise<void> {
    const user = request.user;
    return this.movieService.addMovieToLibrary(movie, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove a movie from my library' })
  @ApiResponse({ status: 200, description: 'Movie removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiBearerAuth()
  @Delete()
  deleteMovie(
    @Query('imdbID') imdbID: string,
    @Req() request: any,
  ): Promise<void> {
    const user = request.user;
    return this.movieService.removeMovie(imdbID, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Review a movie' })
  @ApiResponse({ status: 200, description: 'Movie reviewed' })
  @ApiResponse({ status: 400, description: 'Invalid rating' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiBearerAuth()
  @Put('review')
  reviewMovie(
    @Query('imdbID') imdbID: string,
    @Query('review') review: number,
    @Req() request: any,
  ): Promise<void> {
    const user = request.user;
    return this.movieService.reviewMovie(imdbID, review, user);
  }
}
