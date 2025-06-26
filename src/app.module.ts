import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AutorModule } from './Autor/autor.module';
import { LivroModule } from './Livro/livro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // tipo do DB
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // entidades
      synchronize: true, // sincroniza o schema do banco com as entidades
    }),
    AutorModule,
    LivroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
