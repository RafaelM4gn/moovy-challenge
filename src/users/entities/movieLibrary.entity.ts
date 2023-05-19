import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { MovieEntity } from 'src/movie/movie.entity';

@Entity()
export class MovieLibraryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userRating: number;

  @ManyToOne(() => UserEntity, (user) => user.movieLibrary)
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.movieLibrary)
  movie: MovieEntity;
}
