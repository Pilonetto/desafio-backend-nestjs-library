import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from "@nestjs/common"
import { BooksService, CreateBookDto, UpdateBookDto } from "./books.service"
import { ApiOperation } from "@nestjs/swagger"

@Controller("books")
export class BooksController {
    private readonly booksService: BooksService

    constructor(service: BooksService) {
        this.booksService = service
    }

    @Get(":id")
    @ApiOperation({ summary: "Buscar um livro por ID" })
    findOne(@Param("id") id: string) {
        return this.booksService.findOne(id)
    }

    @Get()
    @ApiOperation({ summary: "Buscar todos os livros" })
    findAll() {
        return this.booksService.findAll()
    }

    @Post("create")
    @ApiOperation({ summary: "Criar um livro" })
    create(@Body() body: CreateBookDto) {
        return this.booksService.create(body)
    }

    @Patch("update/:id")
    @ApiOperation({ summary: "Atualizar um livro existente" })
    update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(id, updateBookDto)
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: "Deletar um livro" })
    delete(@Param("id") id: string) {
        return this.booksService.delete(id)
    }
}
