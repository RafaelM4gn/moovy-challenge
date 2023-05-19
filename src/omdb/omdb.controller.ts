import { Controller, Get, Query } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('omdb')
export class OmdbController {
  constructor(private readonly ombdService: OmdbService) {}

  @ApiOperation({ summary: 'Search for a movie' })
  @ApiOkResponse({
    description: 'A list of all movies found with given substring in title',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({ name: 'search', required: true })
  @Get('search')
  async searchMovie(@Query('search') search: string): Promise<any> {
    return this.ombdService.GetMoviesByTitle(search);
  }
}
