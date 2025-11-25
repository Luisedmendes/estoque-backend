import { IBaseRepository } from '@shared/container/modules/repositories/IBaseRepository';
import { Tag } from '../entities/Tags';

export interface ITagsRepository extends IBaseRepository<Tag> {
  // non-generic methods here
}
