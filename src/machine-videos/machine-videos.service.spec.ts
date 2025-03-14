import { Test, TestingModule } from '@nestjs/testing';
import { MachineVideosService } from './machine-videos.service';

describe('MachineVideosService', () => {
  let service: MachineVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineVideosService],
    }).compile();

    service = module.get<MachineVideosService>(MachineVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
