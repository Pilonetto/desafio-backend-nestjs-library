import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateAutorDto {
  @ApiProperty({
    example: 'Machado de Assis',
    description: 'O nome completo do autor.',
  })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({
    example: '1839-06-21',
    description: 'A data de nascimento do autor no formato YYYY-MM-DD.',
  })
  @IsDateString()
  @IsNotEmpty()
  dataNascimento: Date;

  @ApiProperty({ required: false, default: 'Brasileira' })
  @IsString()
  @IsOptional()
  nacionalidade?: string;
}
