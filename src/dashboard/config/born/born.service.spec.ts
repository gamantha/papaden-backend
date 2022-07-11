import { Test, TestingModule } from '@nestjs/testing';
import { BornService } from './born.service';

describe('BornService', () => {
  let service: BornService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BornService],
    }).compile();

    service = module.get<BornService>(BornService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
