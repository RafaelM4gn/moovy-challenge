import { UserEntity } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'mymovies' })
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

  @Column({ nullable: true })
  userRating: number;

  @ManyToMany(() => UserEntity, (user) => user.movieList)
  usersList: UserEntity[];
}
