import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './Entities/autor.entity';
import { CreateAutorDto } from './DTO/create-autor.dto';
import { UpdateAutorDto } from './DTO/update-autor.dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autorExistente = await this.autorRepository.findOne({
      where: { nome: createAutorDto.nome },
    });
    if (autorExistente) {
      throw new ConflictException('Já existe um autor com este nome.');
    }
    const autor = this.autorRepository.create(createAutorDto);
    return this.autorRepository.save(autor);
  }

  findAll(): Promise<Autor[]> {
    return this.autorRepository.find({ relations: ['livros'] }); // incluindo livros
  }

  async findOne(id: string): Promise<Autor> {
    const autor = await this.autorRepository.findOne({
      where: { id },
      relations: ['livros'],
    });
    if (!autor) {
      throw new NotFoundException(`Autor com ID "${id}" não encontrado.`);
    }
    return autor;
  }

  async update(id: string, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id); // busca erro
    this.autorRepository.merge(autor, updateAutorDto);
    return this.autorRepository.save(autor);
  }

  async remove(id: string): Promise<void> {
    const autor = await this.findOne(id);
    await this.autorRepository.remove(autor);
  }
}
