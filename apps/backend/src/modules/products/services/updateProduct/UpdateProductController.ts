import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { UpdateProductService } from './UpdateProductService';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { Product } from '@modules/products/entities/Product';

export class UpdateProductController {
  public async handle(
    request: Request<IProductDTO, never, IProductDTO>,
    response: Response<IResponseDTO<Product>>,
  ) {
    const updateProduct = container.resolve(UpdateProductService);

    const { id } = request.params;
    const productData = request.body;

    const product = await updateProduct.execute(productData, id);

    return response.status(product.code).send(product);
  }
}
