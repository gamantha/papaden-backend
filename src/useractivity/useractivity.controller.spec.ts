import { Test, TestingModule } from '@nestjs/testing';
import { UseractivityController } from './useractivity.controller';
import { UseractivityService } from './useractivity.service';

describe('UseractivityController', () => {
  let controller: UseractivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseractivityController],
      providers: [UseractivityService],
    }).compile();

    controller = module.get<UseractivityController>(UseractivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
