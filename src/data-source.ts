import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Person } from './person/entities/person.entity';
import { Post } from './post/entities/post.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'id',
  password: 'pw',
  database: 'db',
  synchronize: true, // 개발 환경에서만 사용: 데이터베이스 스키마를 자동으로 동기화
  logging: true, // SQL 쿼리 로그를 출력
  entities: [Person, Post],
  //   entities: [__dirname + '/entities/*.entity.{js,ts}'], // 엔티티 파일 경로
});
