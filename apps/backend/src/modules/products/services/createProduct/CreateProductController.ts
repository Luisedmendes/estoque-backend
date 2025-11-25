import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { CreateProductService } from './CreateProductService';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { Product } from '@modules/products/entities/Product';

export class CreateProductController {
  public async handle(
    request: Request<never, never, IProductDTO>,
    response: Response<IResponseDTO<Product>>,
  ) {
    const productData = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute(productData);

    return response.status(product.code).send(product);
  }
}
