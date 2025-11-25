import { CreateCategoryController } from '@modules/products/services/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/products/services/deleteCategory/DeleteCategoryController';
import { ListCategoryController } from '@modules/products/services/listCategory/ListCategoryController';
import { ShowCategoryController } from '@modules/products/services/showCategory/ShowCategoryController';
import { UpdateCategoryController } from '@modules/products/services/updateCategory/UpdateCategoryController';
import { Router } from 'express';

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const updateCategoryController = new UpdateCategoryController()
const showCategoryController = new ShowCategoryController()

categoryRouter.get('/categories', listCategoryController.handle);
categoryRouter.post('/categories', createCategoryController.handle);
categoryRouter.delete('/categories/:id', deleteCategoryController.handle);
categoryRouter.put('/categories/:id', updateCategoryController.handle);
categoryRouter.get('/categories/:id', showCategoryController.handle);

export { categoryRouter };
