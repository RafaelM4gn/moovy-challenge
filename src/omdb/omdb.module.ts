import { Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { OmdbController } from './omdb.controller';

@Module({
  providers: [OmdbService],
  controllers: [OmdbController],
})
export class OmdbModule {}
