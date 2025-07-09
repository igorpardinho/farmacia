import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { Categoria } from './modules/categoria/entity/categoria';
import { Produto } from './modules/produto/entity/produto';
import { ProdutoModule } from './modules/produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      synchronize: true,
      entities: [Categoria, Produto],
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
