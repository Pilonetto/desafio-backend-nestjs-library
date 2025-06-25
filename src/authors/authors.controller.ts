import { Controller, Get, Post } from "@nestjs/common"

@Controller("authors")
export class AuthorsController {
    @Get()
    getAuthors() {
        return "lista de autores"
    }

    @Post("create")
    createAuthor() {
        return "autor criado"
    }
}
