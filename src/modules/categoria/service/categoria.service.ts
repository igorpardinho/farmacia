import { CategoriaResponseDto } from './../dto/categoria.response.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Categoria } from '../entity/categoria';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaRequestDto } from '../dto/categoria.request.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<CategoriaResponseDto[]> {
    const categorias = await this.categoriaRepository.find();
    return categorias.map((categoria) => new CategoriaResponseDto(categoria));
  }

  async findById(id: number): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('categoria não encontrada!');
    }
    return new CategoriaResponseDto(categoria);
  }

  async create(dto: CategoriaRequestDto): Promise<CategoriaResponseDto> {
    const categoria = new Categoria();
    categoria.nome = dto.nome;
    categoria.descricao = dto.descricao;
    await this.categoriaRepository.save(categoria);
    return new CategoriaResponseDto(categoria);
  }

  async update(
    id: number,
    dto: CategoriaRequestDto,
  ): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException('categoria não encontrada!');
    }
    categoria.nome = dto.nome;
    categoria.descricao = dto.descricao;

    await this.categoriaRepository.save(categoria);
    return new CategoriaResponseDto(categoria);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException('categoria não encontrada!');
    }
    await this.categoriaRepository.delete(id);
  }

  async categoryByName(nome: string): Promise<CategoriaResponseDto[]> {
    const categoria = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
    if (!categoria) {
      throw new NotFoundException('categoria não encontrada!');
    }
    return categoria.map((c) => new CategoriaResponseDto(c));
  }
}
