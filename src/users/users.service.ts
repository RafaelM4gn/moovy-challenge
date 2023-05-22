import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ username: username });
  }

  // dev
  async createUser(user: UserDto): Promise<string> {
    const userExists = await this.usersRepository.findOne({
      username: user.username,
    });

    if (userExists) {
      throw new HttpException(
        {
          status: 409,
          error: 'user already exists',
        },
        409,
      );
    }

    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return 'User created successfully';
  }
}
