import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const isPasswordMatching = await compare(password, user.password);
      if (isPasswordMatching) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
