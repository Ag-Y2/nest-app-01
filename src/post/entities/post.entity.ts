import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30, default: 'This is a default title' })
  title: string;

  @Column({
    nullable: true,
    length: 500,
  })
  content: string;

  @ManyToOne(() => Person, (person) => person.posts)
  person: Person;
}
