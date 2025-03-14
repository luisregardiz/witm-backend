import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  async searchVideos(
    @Query('query') query: string,
    @Query('maxResults') maxResults: number,
  ) {
    return this.youtubeService.searchVideos(query, maxResults || 10);
  }

  @Post('search')
  async searchVideosPost(@Body() body: { query: string; maxResults?: number }) {
    return this.youtubeService.searchVideos(body.query, body.maxResults || 10);
  }
}
