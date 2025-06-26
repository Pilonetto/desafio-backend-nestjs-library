// src/livro/entities/livro.entity.ts
import { Autor } from '../../Autor/Entities/autor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  descricao!: string;

  @Column()
  anoPublicacao: number;

  // Relacionamento: Muitos livros para UM autor
  @ManyToOne(() => Autor, (autor) => autor.livros, {
    onDelete: 'CASCADE', // Regra: Ao deletar um autor, deleta seus livros
    nullable: false, // Regra: Não pode existir livro sem autor
  })
  @JoinColumn({ name: 'autorId' }) // Chave estrangeira
  autor: Autor;

  @Column()
  autorId: string; // Coluna que armazena o ID do autor
}
