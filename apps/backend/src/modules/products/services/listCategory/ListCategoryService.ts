import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToInstance } from 'class-transformer';
import { ICacheDTO } from '@dtos/ICacheDTO';
import { IListDTO } from '@dtos/IListDTO';
import { IConnection } from '@shared/typeorm';
import { FindOptionsWhere } from 'typeorm';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { Category } from '@modules/products/entities/Category';

@injectable()
export class ListCategoryService {
  public constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(
    page: number,
    limit: number,
    filters: FindOptionsWhere<Category>
  ): Promise<IListDTO<Category>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const cacheKey = `${this.connection.client
        }:categories:${page}:${limit}:${JSON.stringify(filters)}`;

      let cache = await this.cacheProvider.recovery<ICacheDTO<Category>>(cacheKey);

      if (!cache) {
        const { list, amount } = await this.categoriesRepository.findAll(
          { where: filters, page, limit, relations: { products: true } },
          trx,
        );
        cache = { data: instanceToInstance(list), total: amount };
        await this.cacheProvider.save(cacheKey, cache);
      }

      if (trx.isTransactionActive) await trx.commitTransaction();

      cache.data = cache.data.map(category => {
        return {
          ...category,
          product_amount: category.products.length
        }
      })

      return {
        code: 200,
        message_code: 'LISTED',
        message: 'Successfully listed categories',
        pagination: {
          total: cache.total,
          page,
          perPage: limit,
          lastPage: Math.ceil(cache.total / limit),
        },
        data: cache.data,
      };
    } catch (error: unknown) {
      if (trx.isTransactionActive) await trx.rollbackTransaction();
      throw error;
    } finally {
      if (!trx.isReleased) await trx.release();
    }
  }
}
