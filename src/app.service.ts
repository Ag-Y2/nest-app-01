import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getYourName(name: string): string {
    return `Hello ${name}!`;
  }
}
