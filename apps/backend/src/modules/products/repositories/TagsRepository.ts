import { BaseRepository } from '@shared/container/modules/repositories/BaseRepository';
import { Tag } from '../entities/Tags';
import { ITagsRepository } from './ITagsRepository';

export class TagsRepository
  extends BaseRepository<Tag>
  implements ITagsRepository {
  public constructor() {
    super(Tag);
  }

  // non-generic methods here
}
