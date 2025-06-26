import {
    ConflictException,
    Injectable,
    NotFoundException
} from "@nestjs/common"
import { ApiProperty, PartialType } from "@nestjs/swagger"
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

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {} // lembrete: PartialType pega todas as propriedades e deixa opcionais (apenas para fins de documentação)

@Injectable()
export class AuthorsService {
    private authorRepository: Repository<Author>

    constructor(
        @InjectRepository(Author)
        repository: Repository<Author>
    ) {
        this.authorRepository = repository
    }

    async findOne(id: string) {
        const author = await this.authorRepository.findOneBy({ id })
        if (!author) {
            throw new NotFoundException(`Autor com o ID '${id}' não encontrado`)
        }
        return author
    }

    async findAll() {
        return this.authorRepository.find()
    }

    async create(createAuthorDto: CreateAuthorDto) {
        const existingAuthor = await this.authorRepository.findOneBy({
            nome: createAuthorDto.nome
        })

        if (existingAuthor) {
            throw new ConflictException(
                `Um autor com o nome '${createAuthorDto.nome}' já existe`
            )
        }

        const newAuthor = this.authorRepository.create(createAuthorDto)
        return this.authorRepository.save(newAuthor)
    }

    async update(id: string, updateAuthorDto: UpdateAuthorDto) {
        const author = await this.findOne(id)
        const updatedAuthor = this.authorRepository.merge(
            author,
            updateAuthorDto
        )
        return this.authorRepository.save(updatedAuthor)
    }

    async delete(id: string) {
        const author = await this.findOne(id)
        await this.authorRepository.remove(author)
    }
}
