import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineVideosService } from './machine-videos.service';

@ApiTags('machine-videos')
@Controller('machine-videos')
export class MachineVideosController {
  constructor(private readonly machineVideosService: MachineVideosService) {}

  @Post('identify-and-find-videos')
  @ApiOperation({ summary: 'Identify machine and find related videos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to identify machine and find videos',
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
    description: 'Machine identified and videos found successfully',
  })
  @ApiResponse({ status: 422, description: 'Invalid file format or size' })
  @UseInterceptors(FileInterceptor('image'))
  async identifyAndFindVideos(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Convert file buffer to base64
    const imageBase64 = file.buffer.toString('base64');

    // Process the image and get videos
    return this.machineVideosService.getMachineVideosFromImage(imageBase64);
  }
}
