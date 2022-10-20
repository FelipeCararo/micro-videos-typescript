import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CreateCategoryUseCase } from '@fc/app/category/application';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
