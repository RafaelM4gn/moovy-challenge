import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
