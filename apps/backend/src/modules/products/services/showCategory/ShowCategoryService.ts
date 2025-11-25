import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Category } from '@modules/products/entities/Category';

@injectable()
export class ShowCategoryService {
  public constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(id?: string): Promise<IResponseDTO<Category>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const category = await this.categoriesRepository.findBy(
        { where: { id } },
        trx,
      );

      if (!category) {
        throw new AppError('NOT_FOUND', 'Category not found', 404);
      }

      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 200,
        message_code: 'FOUND',
        message: 'Category found successfully',
        data: instanceToInstance(category),
      };
    } catch (error: unknown) {
      if (trx.isTransactionActive) await trx.rollbackTransaction();
      throw error;
    } finally {
      if (!trx.isReleased) await trx.release();
    }
  }
}
