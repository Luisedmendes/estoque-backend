import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnection } from '@shared/typeorm';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '@modules/products/entities/Product';

@injectable()
export class ShowProductService {
  public constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,

    @inject('Connection')
    private readonly connection: IConnection,
  ) { }

  public async execute(id?: string): Promise<IResponseDTO<Product>> {
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

      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 200,
        message_code: 'FOUND',
        message: 'Product found successfully',
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
