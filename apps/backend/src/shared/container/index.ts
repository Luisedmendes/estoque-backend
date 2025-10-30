import './providers';
import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/products/repositories/CategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);


container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
