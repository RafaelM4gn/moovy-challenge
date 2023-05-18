import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

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
}
