import { Router } from 'express';
import { CreateTagController } from '@modules/products/services/createTag/CreateTagController';
import { ListTagController } from '@modules/products/services/listTags/ListTagController';

const tagRouter = Router();
const createTagController = new CreateTagController();
const listTagController = new ListTagController()

tagRouter
  .route('/tags')
  .post(createTagController.handle)
  .get(listTagController.handle);

export { tagRouter };
