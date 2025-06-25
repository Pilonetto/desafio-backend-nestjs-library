import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("authors")
export class Author {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    nome: string

    @Column()
    dataNascimento: Date

    @Column()
    nacionalidade: string
}
