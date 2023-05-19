import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './movie.entity';
import { UserEntity } from '../users/entities/user.entity';
import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, UserEntity, MovieLibraryEntity]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
