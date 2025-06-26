import { Injectable } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Repository } from "typeorm"
import { Author } from "./authors.entity"
import { InjectRepository } from "@nestjs/typeorm"

export class CreateAuthorDto {
    @ApiProperty({
        description: "O nome completo do autor",
        example: "Machado de Assis"
    })
    nome: string

    @ApiProperty({
        description:
            "A data de nascimento do autor. O formato esperado é YYYY-MM-DD",
        example: "1839-06-21",
        type: String,
        format: "date"
    })
    dataNascimento: Date

    @ApiProperty({
        description: "A nacionalidade ou país de origem do autor",
        example: "Brasileiro"
    })
    nacionalidade: string
}

@Injectable()
export class AuthorsService {
    private authorRepository: Repository<Author>

    constructor(
        @InjectRepository(Author)
        repository: Repository<Author>
    ) {
        this.authorRepository = repository
    }

    async findAll() {
        return this.authorRepository.find()
    }

    async createAuthor(createAuthorDto: CreateAuthorDto) {
        const newAuthor = this.authorRepository.create(createAuthorDto)
        return this.authorRepository.save(newAuthor)
    }
}
