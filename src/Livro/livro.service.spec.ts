// src/livro/livro.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { LivroService } from './livro.service';
import { AutorService } from '../autor/autor.service'; // A dependência que precisamos mockar
import { Livro } from './entities/livro.entity';
import { Autor } from '../autor/entities/autor.entity';

// Mock do Repositório de Livro
const mockLivroRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

// Mock do AutorService (nossa nova dependência)
// Só precisamos mockar os métodos que o LivroService de fato usa.
const mockAutorService = {
  findOne: jest.fn(),
};

describe('LivroService', () => {
  let service: LivroService;
  let autorService: AutorService;

  beforeEach(async () => {
    // Resetamos os mocks antes de cada teste para eles não interferirem um no outro
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivroService,
        // Além de mockar o repositório de Livro, agora também estamos
        // fornecendo uma versão falsa do AutorService.
        { provide: AutorService, useValue: mockAutorService },
        { provide: getRepositoryToken(Livro), useValue: mockLivroRepository },
      ],
    }).compile();

    service = module.get<LivroService>(LivroService);
    autorService = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo livro com sucesso', async () => {
      // Arrange
      const autorMock = { id: 'uuid-do-autor', nome: 'Jorge Amado' } as Autor;
      const createLivroDto = {
        titulo: 'Gabriela, Cravo e Canela',
        anoPublicacao: 1958,
        autorId: autorMock.id,
      };
      const livroMock = { id: 'uuid-do-livro', ...createLivroDto };

      // Comportamento dos mocks para este teste:
      // 1. O AutorService vai fingir que encontrou o autor com sucesso.
      mockAutorService.findOne.mockResolvedValue(autorMock);
      // 2. O repositório de Livro vai se comportar como esperado para criar.
      mockLivroRepository.create.mockReturnValue(livroMock);
      mockLivroRepository.save.mockResolvedValue(livroMock);

      // Act
      const result = await service.create(createLivroDto);

      // Assert
      expect(result).toEqual(livroMock);
      // Verificamos se o findOne do autorService foi chamado com o ID correto
      expect(mockAutorService.findOne).toHaveBeenCalledWith(autorMock.id);
    });

    it('deve lançar um NotFoundException se o autor não existir', async () => {
      // Arrange
      const createLivroDto = {
        titulo: 'Livro Órfão',
        anoPublicacao: 2025,
        autorId: 'uuid-de-autor-invalido',
      };

      // Comportamento do mock para o cenário de erro:
      // O AutorService vai fingir que NÃO encontrou o autor, disparando o erro.
      mockAutorService.findOne.mockRejectedValue(new NotFoundException());

      // Act & Assert
      // Esperamos que a chamada seja rejeitada com o erro NotFoundException.
      await expect(service.create(createLivroDto)).rejects.toThrow(
        NotFoundException,
      );
      // Garantimos que o repositório de livro nem sequer tentou salvar nada.
      expect(mockLivroRepository.save).not.toHaveBeenCalled();
    });
  });
});
