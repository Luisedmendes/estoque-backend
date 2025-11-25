import { IBaseRepository } from '@shared/container/modules/repositories/IBaseRepository';
import { Product } from '../entities/Product';

export interface IProductsRepository extends IBaseRepository<Product> {
  // non-generic methods here
}
