import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OmdbModule } from './omdb/omdb.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'moovydb',
      username: 'postgres',
      password: 'root',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MovieModule,
    AuthModule,
    UsersModule,
    OmdbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
