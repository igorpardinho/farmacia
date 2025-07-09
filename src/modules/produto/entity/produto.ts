import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entity/categoria';

@Entity('tb_produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  nome: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
