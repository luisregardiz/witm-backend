import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { YoutubeModule } from './youtube/youtube.module';
import { MachineVideosModule } from './machine-videos/machine-videos.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // For loading environment variables
    GeminiModule,
    YoutubeModule,
    MachineVideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
