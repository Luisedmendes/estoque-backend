import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IUserDTO } from '@modules/users/dtos/IUserDTO';
import { DeleteCategoryService } from './DeleteCategoryService';

export class DeleteCategoryController {
  public async handle(
    request: Request<IUserDTO>,
    response: Response<IResponseDTO<null>>,
  ) {
    const deleteUser = container.resolve(DeleteCategoryService);

    const { id } = request.params;

    const user = await deleteUser.execute(id);

    return response.send(user);
  }
}
