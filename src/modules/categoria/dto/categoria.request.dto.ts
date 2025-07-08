import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriaRequestDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}
