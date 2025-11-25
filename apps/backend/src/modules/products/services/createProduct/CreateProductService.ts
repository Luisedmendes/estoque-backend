import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { Product } from '@modules/products/entities/Product';
import { IFilesRepositoryDTO } from '@modules/system/repositories/IFilesRepository';
import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { ITagsRepository } from '@modules/products/repositories/ITagsRepository';

@injectable()
export class CreateProductService {
  public constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,

    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('TagsRepository')
    private readonly tagsRepository: ITagsRepository,

    @inject('FilesRepository')
    private readonly filesRepository: IFilesRepositoryDTO,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(
    productData: IProductDTO,
  ): Promise<IResponseDTO<Product>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {

      const file = await this.filesRepository.exists({ where: { id: productData.file_id } }, trx)

      if (!file) {
        throw new AppError('BAD_REQUEST', 'File is required', 400)
      }

      const category = await this.categoriesRepository.exists({ where: { id: productData.category_id } }, trx)

      if (!category) {
        throw new AppError('BAD_REQUEST', 'category is required', 400)
      }

      if (productData.tags_id.length) {
        const tags = await this.tagsRepository.findIn({ where: { id: productData.tags_id } }, trx)

        productData.tags = tags
      }

      const product = await this.productsRepository.create(productData, trx);

      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:products`,
      );
      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:categories`,
      );
      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 201,
        message_code: 'CREATED',
        message: 'Product successfully created',
        data: instanceToInstance(product),
      };
    } catch (error: unknown) {
      if (trx.isTransactionActive) await trx.rollbackTransaction();
      throw error;
    } finally {
      if (!trx.isReleased) await trx.release();
    }
  }
}
