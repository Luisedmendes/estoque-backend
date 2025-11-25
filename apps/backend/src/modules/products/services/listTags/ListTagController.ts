import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindOptionsWhere } from 'typeorm';
import { IListDTO } from '@dtos/IListDTO';
import { ListTagsService } from './ListTagsService';
import { Tag } from '@modules/products/entities/Tags';

export class ListTagController {
  public async handle(
    request: Request<
      never,
      never,
      never,
      { page: number; limit: number } & FindOptionsWhere<Tag>
    >,
    response: Response<IListDTO<Tag>>,
  ) {
    const listTags = container.resolve(ListTagsService);

    const { page = 1, limit = 20, ...filters } = request.query;

    const tags = await listTags.execute(
      page,
      limit,
      filters
    );

    return response.status(tags.code).send(tags);
  }
}
