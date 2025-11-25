import { BaseRepository } from '@shared/container/modules/repositories/BaseRepository';
import { Product } from '../entities/Product';
import { IProductsRepository } from './IProductsRepository';

export class ProductsRepository
  extends BaseRepository<Product>
  implements IProductsRepository {
  public constructor() {
    super(Product);
  }

  // non-generic methods here
}
