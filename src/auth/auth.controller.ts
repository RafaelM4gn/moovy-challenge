import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('login')
  async login(@Request() req: { user: UserDto }) {
    return this.authService.login(req.user);
  }
}
