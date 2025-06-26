import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BooksModule } from "./books/books.module"
import { AuthorsModule } from "./authors/authors.module"

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "banco-nervoso.sqlite3",
            synchronize: true,
            autoLoadEntities: true
        }),
        BooksModule,
        AuthorsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
