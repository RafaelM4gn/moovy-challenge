import { MovieLibraryEntity } from 'src/users/entities/movieLibrary.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ type: 'float' })
  imdbRating: number;

  @OneToMany(() => MovieLibraryEntity, (movieLibrary) => movieLibrary.movie)
  movieLibrary: MovieLibraryEntity[];
}
