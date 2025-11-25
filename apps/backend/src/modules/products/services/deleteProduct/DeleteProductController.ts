import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { DeleteProductService } from './DeleteProductService';

export class DeleteProductController {
  public async handle(
    request: Request<IProductDTO>,
    response: Response<IResponseDTO<null>>,
  ) {
    const deleteProduct = container.resolve(DeleteProductService);

    const { id } = request.params;

    const product = await deleteProduct.execute(id);

    return response.send(product);
  }
}
