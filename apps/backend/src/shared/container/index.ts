import './providers';
import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/products/repositories/CategoriesRepository';
import { ITagsRepository } from '@modules/products/repositories/ITagsRepository';
import { TagsRepository } from '@modules/products/repositories/TagsRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/repositories/ProductsRepository';
import { IFoldersRepositoryDTO } from '@modules/system/repositories/IFoldersRepository';
import { FoldersRepository } from '@modules/system/repositories/FoldersRepository';
import { IFilesRepositoryDTO } from '@modules/system/repositories/IFilesRepository';
import { FilesRepository } from '@modules/system/repositories/FilesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository)

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository)

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)

container.registerSingleton<IFoldersRepositoryDTO>('FoldersRepository', FoldersRepository)

container.registerSingleton<IFilesRepositoryDTO>('FilesRepository', FilesRepository)