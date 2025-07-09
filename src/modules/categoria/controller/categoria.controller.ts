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
import { CategoriaService } from '../service/categoria.service';
import { CategoriaResponseDto } from '../dto/categoria.response.dto';
import { CategoriaRequestDto } from '../dto/categoria.request.dto';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<CategoriaResponseDto[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CategoriaRequestDto): Promise<CategoriaResponseDto> {
    return this.categoriaService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoriaRequestDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.update(id, dto);
  }

  @Get('/nome/:nome')
  findCategoryByName(
    @Param('nome') nome: string,
  ): Promise<CategoriaResponseDto[]> {
    return this.categoriaService.categoryByName(nome);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}
