import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AutorService } from './autor.service';
import { Autor } from './entities/autor.entity';

// 1. Criamos um objeto FALSO (mock) que imita o Repository do TypeORM.
// Usamos jest.fn() para simular cada função que nosso service usa.
const mockAutorRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  merge: jest.fn(),
};

// 2. O 'describe' é a nossa Suíte de Testes: um grupo de testes para o AutorService.
describe('AutorService', () => {
  let service: AutorService;
  let repository: Repository<Autor>;

  // 3. O 'beforeEach' roda ANTES de cada teste. Ele garante que cada teste comece com um ambiente limpo.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutorService, // Queremos testar o AutorService real.
        {
          // Aqui está a mágica: quando o NestJS for criar o AutorService e pedir pela
          // dependência do Repository<Autor>, nós não vamos dar um banco de dados de verdade.
          // Em vez disso, nós dizemos: "Tome aqui o nosso objeto falso mockAutorRepository".
          provide: getRepositoryToken(Autor),
          useValue: mockAutorRepository,
        },
      ],
    }).compile();

    service = module.get<AutorService>(AutorService);
    repository = module.get<Repository<Autor>>(getRepositoryToken(Autor));
  });

  // 4. Um teste simples para garantir que tudo foi configurado corretamente.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Testando o método 'create'
  describe('create', () => {
    // Teste 1: O cenário de sucesso
    it('deve criar um novo autor com sucesso', async () => {
      // Arrange (Arrumar o cenário)
      const createAutorDto = {
        nome: 'Jorge Amado',
        dataNascimento: new Date('1912-08-10'),
      };
      const autorMock = { id: 'some-uuid', ...createAutorDto };

      // Dizemos ao nosso repositório falso como se comportar para ESTE teste:
      mockAutorRepository.findOne.mockResolvedValue(null); // Ao procurar, finja que não encontrou ninguém.
      mockAutorRepository.create.mockReturnValue(autorMock); // Ao criar, retorne o autor mockado.
      mockAutorRepository.save.mockResolvedValue(autorMock); // Ao salvar, retorne o autor mockado.

      // Act - executar a função a ser testada
      const result = await service.create(createAutorDto as any);

      // Assert - verificar se o resultado é o esperado)
      expect(result).toEqual(autorMock);
      expect(mockAutorRepository.findOne).toHaveBeenCalledWith({
        where: { nome: createAutorDto.nome },
      });
      expect(mockAutorRepository.save).toHaveBeenCalledWith(autorMock);
    });

    // Teste 2: O cenário de erro
    it('deve lançar um erro de conflito se o nome do autor já existe', async () => {
      // Arrange
      const createAutorDto = {
        nome: 'Jorge Amado',
        dataNascimento: new Date('1912-08-10'),
      };

      // Para este teste, o repositório falso vai fingir que JÁ ENCONTROU um autor.
      mockAutorRepository.findOne.mockResolvedValue({
        id: 'some-uuid',
        nome: 'Jorge Amado',
      });

      // Act & Assert
      // Nós esperamos que a promessa de 'service.create' seja REJEITADA
      // e que o erro lançado seja do tipo ConflictException.
      await expect(service.create(createAutorDto as any)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
