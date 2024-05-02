import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
