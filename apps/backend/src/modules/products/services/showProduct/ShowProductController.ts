import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { ShowProductService } from './ShowProductService';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { Product } from '@modules/products/entities/Product';

export class ShowProductController {
  public async handle(
    request: Request<IProductDTO>,
    response: Response<IResponseDTO<Product>>,
  ) {
    const showProduct = container.resolve(ShowProductService);

    const { id } = request.params;

    const category = await showProduct.execute(id);

    return response.status(category.code).send(category);
  }
}
