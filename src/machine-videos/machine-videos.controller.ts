import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineVideosService } from './machine-videos.service';

@Controller('machine-videos')
export class MachineVideosController {
  constructor(private readonly machineVideosService: MachineVideosService) {}

  @Post('identify-and-find-videos')
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
