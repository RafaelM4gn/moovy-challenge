import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

//create dto of movientity
export class MovieDTO {
  @IsNotEmpty()
  @IsString()
  imdbID: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  poster: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  imdbRating: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  userRating?: number;

  constructor(
    imdbID: string,
    title: string,
    poster: string,
    imdbRating: number,
    userRating: number,
  ) {
    this.imdbID = imdbID;
    this.title = title;
    this.poster = poster;
    this.imdbRating = imdbRating;
    this.userRating = userRating;
  }
}
