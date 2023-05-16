import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'mymovies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //create title, poster, imdbID columns
  @Column({ nullable: false })
  title: string;

  @Column()
  poster: string;

  @Column()
  imdbID: string;
}
