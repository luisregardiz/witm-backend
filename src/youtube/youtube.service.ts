import { Injectable } from '@nestjs/common';

import { google, youtube_v3 } from 'googleapis';

@Injectable()
export class YoutubeService {
  private youtube: youtube_v3.Youtube;

  constructor() {
    // Initialize the YouTube API client
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY, // Store your API key in environment variables
    });
  }

  async searchVideos(query: string, maxResults = 10): Promise<any[]> {
    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        q: query,
        maxResults: maxResults,
        type: ['video'],
      });

      // Transform the response to include video URLs
      return response.data.items.map((item) => {
        const videoId = item.id.videoId;
        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
        };
      });
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }
}
