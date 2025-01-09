import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { Person } from './person/entities/person.entity';
import { Post } from './post/entities/post.entity';

config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // 개발 환경에서만 사용: 데이터베이스 스키마를 자동으로 동기화
  logging: true, // SQL 쿼리 로그를 출력
  entities: [Person, Post],
  //   entities: [__dirname + '/entities/*.entity.{js,ts}'], // 엔티티 파일 경로
});
