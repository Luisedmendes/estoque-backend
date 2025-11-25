import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { updateAttribute } from '@utils/mappers';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { ICategoryDTO } from '@modules/products/dtos/ICategoryDTO';
import { Category } from '@modules/products/entities/Category';

@injectable()
export class UpdateCategoryService {
  public constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(
    categoryData: ICategoryDTO,
    id?: string,
  ): Promise<IResponseDTO<Category>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const user = await this.categoriesRepository.findBy(
        { where: { id } },
        trx,
      );

      if (!user) {
        throw new AppError('NOT_FOUND', 'Category not found', 404);
      }

      await this.categoriesRepository.update(
        updateAttribute(user, categoryData),
        trx,
      );

      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:categories`,
      );
      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 200,
        message_code: 'UPDATED',
        message: 'Successfully updated category',
        data: instanceToInstance(user),
      };
    } catch (error: unknown) {
      if (trx.isTransactionActive) await trx.rollbackTransaction();
      throw error;
    } finally {
      if (!trx.isReleased) await trx.release();
    }
  }
}
