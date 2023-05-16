import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
