import { Injectable } from "@nestjs/common"
import { Book } from "./books.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

export class CreateBookDto {
    @ApiProperty({
        description: "O título principal do livro",
        example: "Memórias Póstumas de Brás Cubas"
    })
    titulo: string

    @ApiProperty({
        description: "Uma breve sinopse sobre o livro",
        example:
            "A autobiografia de um defunto autor que decide narrar sua vida após a morte"
    })
    descricao: string

    @ApiProperty({
        description: "O ano em que o livro foi publicado pela primeira vez",
        example: 1881
    })
    anoPublicacao: number

    @ApiProperty({
        description: "O ID do autor do livro (no formato UUID)",
        example: "f8b5a89a-9e1e-4b4b-8e1e-9e1e4b4b8e1e"
    })
    autorId: string
}

@Injectable()
export class BooksService {
    private bookRepository: Repository<Book>

    constructor(
        @InjectRepository(Book)
        repository: Repository<Book>
    ) {
        this.bookRepository = repository
    }

    async findAll() {
        return this.bookRepository.find()
    }

    async createBook(createBookDto: CreateBookDto) {
        const newBook = this.bookRepository.create(createBookDto)
        return this.bookRepository.save(newBook)
    }
}
