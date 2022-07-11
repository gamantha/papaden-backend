import { Test, TestingModule } from '@nestjs/testing';
import { SexController } from './sex.controller';
import { SexService } from './sex.service';

describe('SexController', () => {
  let controller: SexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SexController],
      providers: [SexService],
    }).compile();

    controller = module.get<SexController>(SexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
