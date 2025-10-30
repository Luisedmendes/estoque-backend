import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindOptionsWhere } from 'typeorm';
import { IListDTO } from '@dtos/IListDTO';
import { ListCategoryService } from './ListCategoryService';
import { Category } from '@modules/products/entities/Category';

export class ListCategoryController {
  public async handle(
    request: Request<
      never,
      never,
      never,
      { page: number; limit: number } & FindOptionsWhere<Category>
    >,
    response: Response<IListDTO<Category>>,
  ) {
    const listCategory = container.resolve(ListCategoryService);

    const { page = 1, limit = 20, ...filters } = request.query;

    const categories = await listCategory.execute(
      page,
      limit,
      filters
    );

    return response.status(categories.code).send(categories);
  }
}
