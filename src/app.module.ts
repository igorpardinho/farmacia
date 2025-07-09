import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { Categoria } from './modules/categoria/entity/categoria';
import { Produto } from './modules/produto/entity/produto';
import { ProdutoModule } from './modules/produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        if (process.env.NODE_ENV === 'test') {
          return {
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            synchronize: true,
            entities: [Categoria, Produto],
          };
        }
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_farmacia',
          synchronize: true,
          entities: [Categoria, Produto],
        };
      },
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
