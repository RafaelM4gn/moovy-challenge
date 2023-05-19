import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { MovieLibraryEntity } from './movieLibrary.entity';
import { MovieEntity } from 'src/movie/movie.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => MovieLibraryEntity, (movieLibrary) => movieLibrary.user)
  movieLibrary: MovieLibraryEntity[];
}
