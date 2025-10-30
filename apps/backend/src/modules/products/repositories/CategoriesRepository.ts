import { BaseRepository } from '@shared/container/modules/repositories/BaseRepository';
import { Category } from '../entities/Category';
import { ICategoriesRepository } from './ICategoriesRepository';

export class CategoriesRepository
  extends BaseRepository<Category>
  implements ICategoriesRepository {
  public constructor() {
    super(Category);
  }

  // non-generic methods here
}
