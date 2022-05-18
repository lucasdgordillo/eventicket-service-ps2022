import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { saveImageToStorage, removeFile } from "src/shared/helpers/image.helper";
import { join } from "path";

@Controller('images')
export class ImageController {

  constructor() {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageFileName = file?.filename;
    if (!imageFileName) return { error: 'Image file must be a png, jpg/jpeg' };
    return { success: true, imagePath: imageFileName };
  }

  @Delete(':imagePath')
  async removeImage(@Param('imagePath') imagePath: string) {
    const imagesFolderPath = join(process.cwd(), 'images');
    const fullImagePath = join(imagesFolderPath + '/' + imagePath);
    removeFile(fullImagePath);
    return { message: 'Delete Image Success' };
  }
}