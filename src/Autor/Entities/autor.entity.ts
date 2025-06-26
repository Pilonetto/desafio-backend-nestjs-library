import { Livro } from '../../Livro/Entities/livro.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Autor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  nome!: string;

  @Column({ type: 'date' })
  dataNascimento!: Date;

  @Column({ nullable: true })
  nacionalidade!: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
