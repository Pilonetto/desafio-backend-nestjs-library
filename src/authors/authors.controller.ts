import { Controller, Get, Post, Body } from "@nestjs/common"
import { AuthorsService, CreateAuthorDto } from "./authors.service"

@Controller("authors")
export class AuthorsController {
    private readonly authorsService: AuthorsService

    constructor(service: AuthorsService) {
        this.authorsService = service
    }

    @Get()
    getAuthors() {
        return this.authorsService.findAll()
    }

    @Post("create")
    createAuthor(@Body() body: CreateAuthorDto) {
        return this.authorsService.createAuthor(body)
    }
}
