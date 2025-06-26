import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Book } from "src/books/books.entity"

@Entity("authors")
export class Author {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    nome: string

    @Column()
    dataNascimento: Date

    @Column()
    nacionalidade: string

    @OneToMany(() => Book, (book) => book.autor)
    livros: Book[]
}
