import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize the Gemini API client
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async identifyMachineFromImage(imageBase64: string): Promise<string> {
    try {
      // Remove the data URL prefix if present
      const base64Data = imageBase64.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        '',
      );

      // Create image part from base64 data
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg', // Adjust based on your image type
        },
      };

      // Prompt for machine identification
      const prompt =
        'Identify what machine or equipment is shown in this image. Return only the name of the machine without any additional text or explanation.';

      // Generate content with the image
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }, imagePart] }],
      });

      const response = await result.response;
      const text = response.text();

      // Return just the machine name
      return text.trim();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}
