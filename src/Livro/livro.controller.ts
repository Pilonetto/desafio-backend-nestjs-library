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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './DTO/create-livro.dto';
import { UpdateLivroDto } from './DTO/update-livro.dto';

@ApiTags('Livros') // endpoint Swagger
@Controller('livros') // prefixo da rota /livros
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiResponse({ status: 201, description: 'O livro foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'O autor informado não foi encontrado.',
  })
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livroService.create(createLivroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros retornada com sucesso.',
  })
  findAll() {
    return this.livroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  // valida 'id' válido - ParseUUIDPipe
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.livroService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLivroDto: UpdateLivroDto,
  ) {
    return this.livroService.update(id, updateLivroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.livroService.remove(id);
  }
}
