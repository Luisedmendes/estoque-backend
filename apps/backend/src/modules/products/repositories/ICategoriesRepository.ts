import { IBaseRepository } from '@shared/container/modules/repositories/IBaseRepository';
import { Category } from '../entities/Category';

export interface ICategoriesRepository extends IBaseRepository<Category> {
  // non-generic methods here
}
