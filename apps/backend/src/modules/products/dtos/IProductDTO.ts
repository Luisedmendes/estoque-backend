import { Product } from '../entities/Product';

export interface IProductDTO extends Partial<Product> {
  file_id: string
  tags_id: Array<string>
}
