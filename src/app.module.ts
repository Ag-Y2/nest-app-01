import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PingController } from './ping/ping.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';

@Module({
  imports: [PersonModule, PostModule],
  controllers: [AppController, PingController],
  providers: [AppService],
})
export class AppModule {}
