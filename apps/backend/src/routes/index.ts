import { Router } from 'express';
import { userRouter } from './userRouter';
import { systemRouter } from './systemRouter';
import { guardRouter } from './guardRouter';
import { categoryRouter } from './categoryRouter';
import { tagRouter } from './tagRouter';
import { productRouter } from './productRouter';


const routes = Router();
routes.use(systemRouter);
routes.use(guardRouter);
routes.use(userRouter);
routes.use(categoryRouter);
routes.use(systemRouter);
routes.use(tagRouter);
routes.use(productRouter);

export { routes };
