import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

import { ValidatePersonGuard } from 'src/guards/validatePerson.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @UseGuards(ValidatePersonGuard)
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.partialUpdate(+id, updatePersonDto);
  }

  @Put(':id')
  async replace(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  @Get('post/:id')
  async findPost(@Param('id') id: string) {
    return this.personService.findPersonWithPosts(+id);
  }
}
