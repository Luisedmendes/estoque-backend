import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { ShowCategoryService } from './ShowCategoryService';
import { ICategoryDTO } from '@modules/products/dtos/ICategoryDTO';
import { Category } from '@modules/products/entities/Category';

export class ShowCategoryController {
  public async handle(
    request: Request<ICategoryDTO>,
    response: Response<IResponseDTO<Category>>,
  ) {
    const showCategory = container.resolve(ShowCategoryService);

    const { id } = request.params;

    const category = await showCategory.execute(id);

    return response.status(category.code).send(category);
  }
}
