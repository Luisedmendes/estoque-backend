import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { UpdateCategoryService } from './UpdateCategoryService';
import { ICategoryDTO } from '@modules/products/dtos/ICategoryDTO';
import { Category } from '@modules/products/entities/Category';

export class UpdateCategoryController {
  public async handle(
    request: Request<ICategoryDTO, never, ICategoryDTO>,
    response: Response<IResponseDTO<Category>>,
  ) {
    const updateCategory = container.resolve(UpdateCategoryService);

    const { id } = request.params;
    const categoryData = request.body;

    const category = await updateCategory.execute(categoryData, id);

    return response.status(category.code).send(category);
  }
}
