import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username', example: 'rafael' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password', example: '1234' })
  readonly password: string;
}
