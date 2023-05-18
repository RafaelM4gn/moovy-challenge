import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

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
  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
