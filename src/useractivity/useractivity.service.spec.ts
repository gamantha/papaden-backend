import { Test, TestingModule } from '@nestjs/testing';
import { UseractivityService } from './useractivity.service';

describe('UseractivityService', () => {
  let service: UseractivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseractivityService],
    }).compile();

    service = module.get<UseractivityService>(UseractivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
