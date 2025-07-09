import { IsNotEmpty, IsString } from 'class-validator';
import { Categoria } from '../../categoria/entity/categoria';

export class ProdutoRequestDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  categoria: Categoria;
}
