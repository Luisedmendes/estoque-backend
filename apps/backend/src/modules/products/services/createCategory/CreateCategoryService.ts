import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { ICategoryDTO } from '@modules/products/dtos/ICategoryDTO';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Category } from '@modules/products/entities/Category';

@injectable()
export class CreateCategoryService {
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
  ): Promise<IResponseDTO<Category>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const category = await this.categoriesRepository.create(categoryData, trx);

      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:categories`,
      );
      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 201,
        message_code: 'CREATED',
        message: 'Category successfully created',
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
