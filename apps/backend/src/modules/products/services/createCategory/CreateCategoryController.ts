import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { CreateCategoryService } from './CreateCategoryService';
import { ICategoryDTO } from '@modules/products/dtos/ICategoryDTO';
import { Category } from '@modules/products/entities/Category';

export class CreateCategoryController {
  public async handle(
    request: Request<never, never, ICategoryDTO>,
    response: Response<IResponseDTO<Category>>,
  ) {
    const categoryData = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute(categoryData);

    return response.status(category.code).send(category);
  }
}
