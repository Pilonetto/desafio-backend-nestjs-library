import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateLivroDto {
  @ApiProperty({
    description: 'O título principal do livro.',
    example: 'O Hobbit',
  })
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @ApiProperty({
    description: 'Uma breve descrição ou sinopse sobre o conteúdo do livro.',
    example:
      'Uma aventura inesperada de um hobbit pacato chamado Bilbo Bolseiro.',
    required: false, // Indica na documentação que este campo é opcional
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'O ano em que o livro foi originalmente publicado.',
    example: 1937,
  })
  @IsNumber()
  @IsNotEmpty()
  anoPublicacao!: number;

  @ApiProperty({
    description: 'O ID do autor (no formato UUID) ao qual o livro pertence.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  autorId!: string;
}
