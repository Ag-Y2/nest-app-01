import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PingResponseDto, PingBodyDto } from './dto/ping.dto';

@Controller('ping')
export class PingController {
  @Get()
  ping() {
    return 'pong';
  }

  @Get('print')
  print(@Query('message') message: string = ''): PingResponseDto {
    return {
      status: 'ok',
      response: `You sent: ${message}`,
    };
  }

  @Post('print')
  postPrint(@Body() body: PingBodyDto): PingResponseDto {
    return {
      status: 'ok',
      response: `You sent: ${body.message}`,
    };
  }
}
