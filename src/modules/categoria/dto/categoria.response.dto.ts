import { Categoria } from '../entity/categoria';

export class CategoriaResponseDto {
  id: number;

  nome: string;

  descricao: string;

  constructor(categoria: Categoria) {
    this.id = categoria.id;
    this.nome = categoria.nome;
    this.descricao = categoria.descricao;
  }
}
