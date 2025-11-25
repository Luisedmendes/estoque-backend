import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { CreateTagService } from './CreateTagService';
import { ITagDTO } from '@modules/products/dtos/ITagDTO';
import { Tag } from '@modules/products/entities/Tags';

export class CreateTagController {
  public async handle(
    request: Request<never, never, ITagDTO>,
    response: Response<IResponseDTO<Tag>>,
  ) {
    const tagData = request.body;

    const createTag = container.resolve(CreateTagService);

    const tag = await createTag.execute(tagData);

    return response.status(tag.code).send(tag);
  }
}
