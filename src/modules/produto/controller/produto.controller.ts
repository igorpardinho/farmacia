import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';
import { ProdutoResponseDto } from '../dto/produto.response.dto';
import { ProdutoRequestDto } from '../dto/produto.request.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ProdutoResponseDto[]> {
    return this.produtoService.findAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ProdutoResponseDto> {
    return this.produtoService.findById(id);
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findProductByName(
    @Param('nome') nome: string,
  ): Promise<ProdutoResponseDto[]> {
    return this.produtoService.findProductByName(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: ProdutoRequestDto): Promise<ProdutoResponseDto> {
    return this.produtoService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProdutoRequestDto,
  ) {
    return this.produtoService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
