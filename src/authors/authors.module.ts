import { Module } from "@nestjs/common"
import { AuthorsController } from "./authors.controller"
import { AuthorsService } from "./authors.service"
import { Author } from "./authors.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    controllers: [AuthorsController],
    providers: [AuthorsService],
    exports: [AuthorsService]
})
export class AuthorsModule {}
