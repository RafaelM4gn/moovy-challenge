import { MovieEntity } from 'src/movie/movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.usersList)
  movieList: MovieEntity[];
}
