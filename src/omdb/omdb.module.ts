import { Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { OmdbController } from './omdb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
import { MovieEntity } from 'src/movie/movie.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MovieEntity, MovieLibraryEntity]),
  ],
  providers: [OmdbService],
  controllers: [OmdbController],
})
export class OmdbModule {}
