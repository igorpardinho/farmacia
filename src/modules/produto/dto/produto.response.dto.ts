import { IsNotEmpty, IsString } from 'class-validator';
import { Produto } from '../entity/produto';
import { Categoria } from '../../categoria/entity/categoria';

export class ProdutoResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  categoria: Categoria;

  constructor(produto: Produto) {
    this.id = produto.id;
    this.nome = produto.nome;
    this.categoria = produto.categoria;
  }
}
