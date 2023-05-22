import { Controller, Post, UseGuards, Request, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate token' })
  @ApiResponse({ status: 200, description: 'Token validated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('validate')
  async validate(@Req() req: any) {
    console.log(req.headers.authorization);
    //get just token from header
    const token = req.headers.authorization.replace('Bearer ', '');

    return this.authService.validateToken(token);
  }

  //get token from header
  @Get('token')
  getToken(@Req() req: any) {
    return req.headers.authorization;
  }
}
