import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieLibraryEntity } from './movieLibrary.entity';

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
