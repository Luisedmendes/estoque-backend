import { Router } from 'express';
import { CreateProductController } from '@modules/products/services/createProduct/CreateProductController';
import { ListProductController } from '@modules/products/services/listProduct/ListProductController';
import { ShowProductController } from '@modules/products/services/showProduct/ShowProductController';
import { UpdateProductController } from '@modules/products/services/updateProduct/UpdateProductController';
import { DeleteProductController } from '@modules/products/services/deleteProduct/DeleteProductController';

const productRouter = Router();
const createProductController = new CreateProductController()
const listProductController = new ListProductController()
const showProductController = new ShowProductController()
const updateProductController = new UpdateProductController()

const deleteProductController = new DeleteProductController()

productRouter
  .route('/products')
  .post(createProductController.handle)
  .get(listProductController.handle)

productRouter
  .route('/products/:id')
  .get(showProductController.handle)
  .put(updateProductController.handle)
  .delete(deleteProductController.handle)

export { productRouter };
