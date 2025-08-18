import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { YoutubeService } from './youtube.service';

@ApiTags('youtube')
@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search YouTube videos' })
  @ApiQuery({ name: 'query', description: 'Search query string', type: String })
  @ApiQuery({
    name: 'maxResults',
    description: 'Maximum number of results',
    type: Number,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Videos found successfully' })
  async searchVideos(
    @Query('query') query: string,
    @Query('maxResults') maxResults: number,
  ) {
    return this.youtubeService.searchVideos(query, maxResults || 10);
  }

  @Post('search')
  @ApiOperation({ summary: 'Search YouTube videos via POST' })
  @ApiBody({
    description: 'Search parameters',
    schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string',
        },
        maxResults: {
          type: 'number',
          description: 'Maximum number of results',
          default: 10,
        },
      },
      required: ['query'],
    },
  })
  @ApiResponse({ status: 200, description: 'Videos found successfully' })
  async searchVideosPost(@Body() body: { query: string; maxResults?: number }) {
    return this.youtubeService.searchVideos(body.query, body.maxResults || 10);
  }
}
