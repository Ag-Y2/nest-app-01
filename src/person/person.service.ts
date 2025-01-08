import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  private personRepository: Repository<Person>;

  constructor() {
    this.personRepository = AppDataSource.getRepository(Person);
  }

  async create(
    createPersonDto: CreatePersonDto,
  ): Promise<Person | { statusCode: number; message: string }> {
    const { name, point } = createPersonDto;

    const person = this.personRepository.create({ name, point });

    if (!person) {
      return {
        statusCode: 500,
        message: 'Person not created.',
      };
    }
    return this.personRepository.save(person);
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    this.checkPersonExists(person, id);

    return person;
  }

  async partialUpdate(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });

    this.checkPersonExists(person, id);

    Object.assign(person, updatePersonDto);

    return this.personRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });

    this.checkPersonExists(person, id);

    person.name = updatePersonDto.name || person.name;
    person.point = updatePersonDto.point || person.point;

    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete({ id });
  }

  // person with posts
  async findPersonWithPosts(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    this.checkPersonExists(person, id);

    return person;
  }

  private checkPersonExists(person: Person | null, id: number): void {
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
  }
}
