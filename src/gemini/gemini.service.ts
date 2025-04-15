import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize the Gemini API client
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL,
    });
  }

  async identifyMachineFromImage(imageBase64: string): Promise<any> {
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

      // Enhanced prompt to get more detailed information
      const prompt =
        'Analyze this exercise machine image and provide the following in JSON format: ' +
        '1. "name": The name of the machine or equipment ' +
        '2. "description": A brief description (max 2 sentences) ' +
        '3. "targetMuscles": An array of muscle groups targeted by this machine ' +
        '4. "howToUse": Step-by-step instructions on how to use the machine' +
        'Return only valid JSON without any additional text.';

      // Generate content with the image
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }, imagePart] }],
      });

      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      try {
        // Extract JSON from the text (in case there's any extra text around it)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : text;

        const parsedData = JSON.parse(jsonString);
        console.log(parsedData);

        // Return only the specific fields needed
        return {
          name: parsedData.name || '',
          description: parsedData.description || '',
          targetMuscles: parsedData.targetMuscles || [],
          howToUse: parsedData.howToUse || [],
        };
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', text);
        // Fallback to returning a structured object with empty values
        return { name: '', description: '', targetMuscles: [] };
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}
