import { Controller, Get, Query } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SearchDto } from './dto/search.dto';

@Controller('omdb')
@ApiTags('Omdb-API')
export class OmdbController {
  constructor(private readonly ombdService: OmdbService) {}

  @ApiOperation({ summary: 'Search for a movie' })
  @ApiOkResponse({
    description: 'A list of all movies found with given substring in title',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({ name: 'search', required: true })
  @Get('search')
  async searchMovie(@Query() searchDto: SearchDto): Promise<any> {
    return this.ombdService.GetMoviesByTitle(searchDto.search);
  }
}
