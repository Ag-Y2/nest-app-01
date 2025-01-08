import { IsString, IsOptional, MaxLength, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  personId: number;

  @IsString()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  content: string;
}
