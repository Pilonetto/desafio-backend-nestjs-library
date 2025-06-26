import { Injectable, NotFoundException } from "@nestjs/common"
import { Book } from "./books.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { AuthorsService } from "src/authors/authors.service"

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

export class UpdateBookDto extends PartialType(CreateBookDto) {}

@Injectable()
export class BooksService {
    private bookRepository: Repository<Book>
    private authorsService: AuthorsService

    constructor(
        @InjectRepository(Book)
        repository: Repository<Book>,
        service: AuthorsService
    ) {
        this.bookRepository = repository
        this.authorsService = service
    }

    async findOne(id: string) {
        const book = await this.bookRepository.findOneBy({ id })
        if (!book) {
            throw new NotFoundException(`Livro com o ID '${id}' não encontrado`)
        }
        return book
    }

    async findAll() {
        return this.bookRepository.find()
    }

    async create(createBookDto: CreateBookDto) {
        const { autorId, ...bookData } = createBookDto

        const autor = await this.authorsService.findOne(autorId)

        const newBook = this.bookRepository.create({
            ...bookData,
            autor
        })

        // magia negra das trevas essa parte aqui (puro ocultismo)
        return this.bookRepository.save(newBook)
    }

    async update(id: string, updatedBookDto: UpdateBookDto) {
        const book = await this.findOne(id)
        const updatedBook = this.bookRepository.merge(book, updatedBookDto)
        return this.bookRepository.save(updatedBook)
    }

    async delete(id: string) {
        const book = await this.findOne(id)
        return this.bookRepository.remove(book)
    }
}
