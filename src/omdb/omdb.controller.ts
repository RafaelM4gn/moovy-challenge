import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SearchDto } from './dto/search.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('omdb')
@ApiTags('Omdb-API')
export class OmdbController {
  constructor(private readonly ombdService: OmdbService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search for a movie' })
  @ApiResponse({ status: 200, description: 'Movies listed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'search', required: true })
  @Get('search')
  async searchMovie(
    @Query() searchDto: SearchDto,
    @Req() request: any,
  ): Promise<any> {
    return this.ombdService.GetMoviesByTitle(searchDto.search, request.user);
  }
}
