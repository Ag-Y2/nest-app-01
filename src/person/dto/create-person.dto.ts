import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePersonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  point?: number;
}
