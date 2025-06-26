import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch
} from "@nestjs/common"
import {
    AuthorsService,
    CreateAuthorDto,
    UpdateAuthorDto
} from "./authors.service"
import { ApiOperation } from "@nestjs/swagger"

@Controller("authors")
export class AuthorsController {
    private readonly authorsService: AuthorsService

    constructor(service: AuthorsService) {
        this.authorsService = service
    }

    @Get()
    @ApiOperation({ summary: "Buscar todos os autores" })
    findAll() {
        return this.authorsService.findAll()
    }

    @Get(":id")
    @ApiOperation({ summary: "Buscar um autor por ID" })
    findOne(@Param("id") id: string) {
        return this.authorsService.findOne(id)
    }

    @Post("create")
    @ApiOperation({ summary: "Criar um autor" })
    create(@Body() body: CreateAuthorDto) {
        return this.authorsService.create(body)
    }

    @Patch("update/:id")
    @ApiOperation({ summary: "Atualizar um autor existente" })
    update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.update(id, updateAuthorDto)
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: "Deletar um autor" })
    remove(@Param("id") id: string) {
        return this.authorsService.remove(id)
    }
}
