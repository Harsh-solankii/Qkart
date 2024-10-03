import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  gettest(): string {
    return 'just testing for deployment and it showing if it worked';
  }

  @Post()
  savedata():string{
    return "nothing";
  }
}
