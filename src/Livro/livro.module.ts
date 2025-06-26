import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './Entities/livro.entity';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { AutorModule } from '../Autor/autor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Livro]), AutorModule],
  controllers: [LivroController],
  providers: [LivroService],
})
export class LivroModule {}
