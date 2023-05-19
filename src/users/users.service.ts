import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ username: username });
  }

  //just for testing
  async createUser(user: UserDto): Promise<string> {
    const userExists = await this.usersRepository.findOne({
      username: user.username,
    });
    if (userExists) {
      return 'user already exists';
    }

    await this.usersRepository.save(user);
    return 'user created';
  }
}
