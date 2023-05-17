import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'mymovies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  imdbID: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  poster: string;

  @Column()
  imdbRating: number;

  @Column({ nullable: true })
  userRating: number;
}
