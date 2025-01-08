import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class PostService {
  private postRepository: Repository<Post>;
  private personRepository: Repository<Person>;

  constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
    this.personRepository = AppDataSource.getRepository(Person);
  }

  async create(
    createPostDto: CreatePostDto,
  ): Promise<Post | { statusCode: number; message: string; data?: Post }> {
    const { title, content, personId } = createPostDto;

    const person = await this.personRepository.findOneBy({ id: personId });
    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found`);
    }

    const post = this.postRepository.create({
      title,
      content,
      person,
    });

    const newPost = await this.postRepository.save(post);

    if (!newPost) {
      return {
        statusCode: 500,
        message: 'Post not created',
      };
    }

    return {
      statusCode: 201,
      message: 'Post created',
      data: newPost,
    };
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    this.checkPostExists(post, id);

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    this.checkPostExists(post, id);

    post.title = updatePostDto.title || post.title;
    post.content = updatePostDto.content || post.content;

    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete({ id });
  }

  private checkPostExists(post: Post | null, id: number): void {
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
