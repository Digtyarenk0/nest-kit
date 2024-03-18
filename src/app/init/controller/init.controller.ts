import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { InitService } from '../service/init.service';
import { ApiOperation } from '@nestjs/swagger';
import { InitResoposeSwagger } from '../decorators';

@Controller()
export class InitController {
  constructor(private readonly appService: InitService) {}

  @ApiOperation({ summary: 'Hello' })
  @InitResoposeSwagger()
  @HttpCode(HttpStatus.OK)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
