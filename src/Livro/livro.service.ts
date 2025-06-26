import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './Entities/livro.entity';
import { CreateLivroDto } from './DTO/create-livro.dto';
import { UpdateLivroDto } from './DTO/update-livro.dto';
import { AutorService } from '../Autor/autor.service';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
    private readonly autorService: AutorService, // Injeta o serviço de autor
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    // Valida se o autor existe antes de criar o livro
    await this.autorService.findOne(createLivroDto.autorId);

    const livro = this.livroRepository.create(createLivroDto);
    return this.livroRepository.save(livro);
  }

  findAll(): Promise<Livro[]> {
    // 'autor' é o nome da relação na entidade Livro
    return this.livroRepository.find({ relations: ['autor'] });
  }

  async findOne(id: string): Promise<Livro> {
    const livro = await this.livroRepository.findOne({
      where: { id },
      relations: ['autor'],
    });
    if (!livro) {
      throw new NotFoundException(`Livro com ID "${id}" não encontrado.`);
    }
    return livro;
  }

  async update(id: string, updateLivroDto: UpdateLivroDto): Promise<Livro> {
    const livro = await this.findOne(id);
    // Se o autorId for alterado, verifica se o novo autor existe
    if (updateLivroDto.autorId) {
      await this.autorService.findOne(updateLivroDto.autorId);
    }
    this.livroRepository.merge(livro, updateLivroDto);
    return this.livroRepository.save(livro);
  }

  async remove(id: string): Promise<void> {
    const livro = await this.findOne(id);
    await this.livroRepository.remove(livro);
  }
}
