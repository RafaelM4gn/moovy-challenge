import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { Repository } from 'typeorm';
import exp from 'constants';

describe('MovieService', () => {
  let mailService: MovieService;
  let mailRepository: Repository<MovieEntity>;

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

    mailService = module.get<MovieService>(MovieService);
    mailRepository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });
});
