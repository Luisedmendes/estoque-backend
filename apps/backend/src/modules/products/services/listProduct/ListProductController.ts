import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindOptionsWhere } from 'typeorm';
import { IListDTO } from '@dtos/IListDTO';
import { ListProductService } from './ListProductService';
import { Product } from '@modules/products/entities/Product';

export class ListProductController {
  public async handle(
    request: Request<
      never,
      never,
      never,
      { page: number; limit: number } & FindOptionsWhere<Product>
    >,
    response: Response<IListDTO<Product>>,
  ) {
    const listProduct = container.resolve(ListProductService);

    const { page = 1, limit = 20, ...filters } = request.query;

    const products = await listProduct.execute(
      page,
      limit,
      filters
    );

    return response.status(products.code).send(products);
  }
}
