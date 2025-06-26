import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './DTO/create-autor.dto';
import { UpdateAutorDto } from './DTO/update-autor.dto';

@ApiTags('Autores') // endpoint Swagger
@Controller('autores') // prefixo da rota: /autores
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo autor' })
  @ApiResponse({ status: 201, description: 'O autor foi criado com sucesso.' })
  @ApiResponse({
    status: 409,
    description: 'Já existe um autor com este nome.',
  })
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.autorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAutorDto: UpdateAutorDto,
  ) {
    return this.autorService.update(id, updateAutorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.autorService.remove(id);
  }
}
