import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateYoutubeDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
