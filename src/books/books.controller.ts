import { Controller, Get, Post, Body } from "@nestjs/common"
import { BooksService, CreateBookDto } from "./books.service"

@Controller("books")
export class BooksController {
    private readonly booksService: BooksService

    constructor(service: BooksService) {
        this.booksService = service
    }

    @Get()
    getBooks() {
        return this.booksService.findAll()
    }

    @Post("create")
    createBook(@Body() body: CreateBookDto) {
        return this.booksService.createBook(body)
    }
}
