import { Module } from "@nestjs/common"
import { BooksController } from "./books.controller"
import { BooksService } from "./books.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Book } from "./books.entity"
import { AuthorsModule } from "src/authors/authors.module"

@Module({
    imports: [TypeOrmModule.forFeature([Book]), AuthorsModule],
    controllers: [BooksController],
    providers: [BooksService]
})
export class BooksModule {}
