import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Produto } from '../entity/produto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoResponseDto } from '../dto/produto.response.dto';
import { ProdutoRequestDto } from '../dto/produto.request.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<ProdutoResponseDto[]> {
    const produtos = await this.produtoRepository.find({
      relations: ['categoria'],
    });
    return produtos.map((produto) => new ProdutoResponseDto(produto));
  }

  async findById(id: number): Promise<ProdutoResponseDto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }

    return new ProdutoResponseDto(produto);
  }

  async findProductByName(nome: string): Promise<ProdutoResponseDto[]> {
    const produtos = await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });

    return produtos.map((produto) => new ProdutoResponseDto(produto));
  }

  async create(dto: ProdutoRequestDto): Promise<ProdutoResponseDto> {
    const produto = new Produto();
    produto.nome = dto.nome;
    produto.categoria = dto.categoria;
    await this.produtoRepository.save(produto);
    return new ProdutoResponseDto(produto);
  }

  async update(
    id: number,
    dto: ProdutoRequestDto,
  ): Promise<ProdutoResponseDto> {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }
    produto.nome = dto.nome;
    produto.categoria = dto.categoria;
    await this.produtoRepository.save(produto);
    return new ProdutoResponseDto(produto);
  }

  async delete(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }
    await this.produtoRepository.delete(id);
  }
}
