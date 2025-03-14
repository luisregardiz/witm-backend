import { Module } from '@nestjs/common';
import { MachineVideosController } from './machine-videos.controller';
import { MachineVideosService } from './machine-videos.service';
import { GeminiModule } from '../gemini/gemini.module';
import { YoutubeModule } from '../youtube/youtube.module';

@Module({
  imports: [GeminiModule, YoutubeModule],
  controllers: [MachineVideosController],
  providers: [MachineVideosService],
})
export class MachineVideosModule {}
