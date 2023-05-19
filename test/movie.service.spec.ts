import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../src/movie/movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieEntity } from '../src/movie/movie.entity';
import { Repository } from 'typeorm';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: Repository<MovieEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {},
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(movieRepository).toBeDefined();
  });
});
