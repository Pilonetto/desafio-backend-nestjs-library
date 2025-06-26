import { Author } from "src/authors/authors.entity"
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm"

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    titulo: string

    @Column()
    descricao: string

    @Column()
    anoPublicacao: number

    @ManyToOne(() => Author, (author) => author.livros, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "autor" })
    autor: Author
}
