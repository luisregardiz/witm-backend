import { Test, TestingModule } from '@nestjs/testing';
import { MachineVideosController } from './machine-videos.controller';
import { MachineVideosService } from './machine-videos.service';

describe('MachineVideosController', () => {
  let controller: MachineVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineVideosController],
      providers: [MachineVideosService],
    }).compile();

    controller = module.get<MachineVideosController>(MachineVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
