import { Injectable } from "@nestjs/common"
import { Book } from "./books.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

export class CreateBookDto {
    titulo: string
    descricao: string
    anoPublicacao: number
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
