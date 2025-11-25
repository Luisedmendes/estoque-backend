import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { updateAttribute } from '@utils/mappers';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IFilesRepositoryDTO } from '@modules/system/repositories/IFilesRepository';
import { IProductDTO } from '@modules/products/dtos/IProductDTO';
import { Product } from '@modules/products/entities/Product';
import { ITagsRepository } from '@modules/products/repositories/ITagsRepository';

@injectable()
export class UpdateProductService {
  public constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,

    @inject('TagsRepository')
    private readonly tagsRepository: ITagsRepository,

    @inject('FilesRepository')
    private readonly filesRepository: IFilesRepositoryDTO,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(
    productData: IProductDTO,
    id?: string,
  ): Promise<IResponseDTO<Product>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const product = await this.productsRepository.findBy(
        { where: { id }, relations: { category: true, file: true, tags: true } },
        trx,
      );

      if (!product) {
        throw new AppError('NOT_FOUND', 'Product not found', 404);
      }

      if (productData?.category_id) {
        const category = await this.categoriesRepository.findBy({ where: { id: productData.category_id } }, trx)

        if (!category) {
          throw new AppError('BAD_REQUEST', 'Category not found', 404)
        }

        productData.category = category
      }

      if (productData?.file_id) {
        const file = await this.filesRepository.findBy({ where: { id: productData.file_id } }, trx)

        if (!file) {
          throw new AppError('BAD_REQUEST', 'File not found', 404)
        }

        productData.file = file
      }

      if (productData?.tags_id?.length) {
        const tags = await this.tagsRepository.findIn({ where: { id: productData.tags_id } }, trx)

        product.tags = tags

      }


      await this.productsRepository.update(
        updateAttribute(product, productData),
        trx,
      );

      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:categories`,
      );
      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:categories`,
      );
      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 200,
        message_code: 'UPDATED',
        message: 'Successfully updated product',
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
