import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imdbID: string;

  @Column()
  title: string;

  @Column()
  poster: string;

  @Column()
  imdbRating: number;

  @Column()
  userRating: number;

  @OneToMany(() => MovieLibraryEntity, (movieLibrary) => movieLibrary.movie)
  movieLibrary: MovieLibraryEntity[];
}
