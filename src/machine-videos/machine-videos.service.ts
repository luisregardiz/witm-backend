import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class MachineVideosService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly youtubeService: YoutubeService,
  ) {}

  async getMachineVideosFromImage(
    imageBase64: string,
    maxResults = 6,
  ): Promise<any> {
    // Step 1: Identify the machine using Gemini
    const machineInformation =
      await this.geminiService.identifyMachineFromImage(imageBase64);

    // Step 2: Search for videos about the identified machine
    const searchQuery = `${machineInformation.name} tutorial`;
    const videos = await this.youtubeService.searchVideos(
      searchQuery,
      maxResults,
    );

    return {
      machineInformation,
      videos,
    };
  }
}
