import { Test, TestingModule } from '@nestjs/testing';
import { BornController } from './born.controller';
import { BornService } from './born.service';

describe('BornController', () => {
  let controller: BornController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BornController],
      providers: [BornService],
    }).compile();

    controller = module.get<BornController>(BornController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
