/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Teste do módulos de Produtos e Categorias', () => {
  let app: INestApplication<App>;
  let produtoId: number;
  let categoriaId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar uma categoria', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias')
      .send({
        nome: 'pressão',
        descricao: 'pressaoooo',
      })
      .expect(201);
    categoriaId = resposta.body.id;
  });

  it('02 - Não deve cadastrar uma categoria', async () => {
    await request(app.getHttpServer())
      .post('/categorias')
      .send({
        nome: '',
        descricao: '',
      })
      .expect(400);
  });

  it('03 - Deve cadastrar um produto', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: 'teste',
        categoria: categoriaId,
      })
      .expect(201);

    produtoId = resposta.body.id;
  });

  it('04 - Não deve cadastrar um produto', async () => {
    await request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: '',
        categoria: '',
      })
      .expect(400);
  });

  it('05 - Deve mostrar todas as categorias', async () => {
    await request(app.getHttpServer()).get('/categorias').expect(200);
  });

  it('06 - Deve mostrar todos os produtos', async () => {
    await request(app.getHttpServer()).get('/produtos').expect(200);
  });

  it('07 - Deve mostrar as categorias por id', async () => {
    await request(app.getHttpServer()).get('/categorias/1').expect(200);
  });

  it('08 - Não deve mostrar as categorias por id', async () => {
    await request(app.getHttpServer()).get('/categorias/2').expect(404);
  });

  it('09 - Deve mostrar os produtos por id', async () => {
    await request(app.getHttpServer()).get('/produtos/1').expect(200);
  });

  it('10 - Não deve mostrar os produtos por id', async () => {
    await request(app.getHttpServer()).get('/produtos/2').expect(404);
  });

  it('11 - Deve atualizar um produto', async () => {
    await request(app.getHttpServer())
      .put(`/produtos/${produtoId}`)
      .send({
        nome: 'atualizou',
        categoria: categoriaId,
      })
      .expect(200);
  });

  it('12 - Não deve atualizar um produto', async () => {
    await request(app.getHttpServer())
      .put('/produtos/2')
      .send({
        nome: 'testeeee',
        categoria: categoriaId,
      })
      .expect(404);
  });

  it('13 - Deve atualizar uma categoria', async () => {
    await request(app.getHttpServer())
      .put(`/categorias/${categoriaId}`)
      .send({
        nome: 'atualizou',
        descricao: 'testeeeee',
      })
      .expect(200);
  });

  it('14 - Não deve atualizar uma categoria', async () => {
    await request(app.getHttpServer())
      .put('/categorias/2')
      .send({
        nome: 'nao atualiza',
        descricao: 'naaoooo',
      })
      .expect(404);
  });

  it('15 - Deve buscar uma categoria pelo nome', async () => {
    await request(app.getHttpServer())
      .get('/categorias/nome/atualizou')
      .expect(200);
  });

  it('16 - Deve buscar um produto pelo nome', async () => {
    await request(app.getHttpServer())
      .get('/produtos/nome/atualizou')
      .expect(200);
  });

  it('17 - Deve deletar um produto', async () => {
    await request(app.getHttpServer())
      .delete(`/produtos/${produtoId}`)
      .expect(204);
  });

  it('18 - Não deve deletar um produto', async () => {
    await request(app.getHttpServer()).delete('/produtos/2').expect(404);
  });

  it('19 - Deve deletar uma categoria', async () => {
    await request(app.getHttpServer())
      .delete(`/categorias/${categoriaId}`)
      .expect(204);
  });

  it('20 - Não deve deletar uma categoria', async () => {
    await request(app.getHttpServer()).delete('/categorias/3').expect(404);
  });
});
