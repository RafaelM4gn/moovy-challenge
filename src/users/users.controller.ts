import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test')
  getHello(): string {
    return 'Hello World!';
  }

  @Get('get-user')
  getUser(username: string): string {
    return 'hello wordl';
  }

  @Post('create-user')
  createUser(@Body() user: UsersDto): Promise<string> {
    return this.usersService.createUser(user);
  }
}
