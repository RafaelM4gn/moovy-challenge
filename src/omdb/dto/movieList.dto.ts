import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//create dto of movientity
export class MovieListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID from imdb', example: 'tt0133093' })
  imdbID: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Title of the movie', example: 'The Matrix' })
  title: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Url of Poster',
    example:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  })
  poster: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({ description: 'IMDB Rating', example: 8.7 })
  imdbRating: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Is movie in my library?', example: true })
  userHasMovie: boolean;
}
