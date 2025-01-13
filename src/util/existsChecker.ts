import { NotFoundException } from '@nestjs/common';
import { Person } from '../person/entities/person.entity';

export function checkPersonExists(person: Person | null, id: number): void {
  if (!person) {
    throw new NotFoundException(`Person with ID ${id} not found`);
  }
}
