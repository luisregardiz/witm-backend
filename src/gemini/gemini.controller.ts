import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeminiService } from './gemini.service';

@ApiTags('gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('identify-machine')
  @ApiOperation({ summary: 'Identify machine from uploaded image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to identify machine',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Machine identified successfully',
    schema: {
      type: 'object',
      properties: {
        machineName: {
          type: 'string',
          description: 'Name of the identified machine',
        },
      },
    },
  })
  @ApiResponse({ status: 422, description: 'Invalid file format or size' })
  @UseInterceptors(FileInterceptor('image'))
  async identifyMachine(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    // Convert file buffer to base64
    const imageBase64 = file.buffer.toString('base64');

    // Identify the machine using Gemini
    const machineName = await this.geminiService.identifyMachineFromImage(
      imageBase64,
    );

    return { machineName };
  }
}
