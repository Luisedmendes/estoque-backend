import { Router } from 'express';
import { userRouter } from './userRouter';
import { systemRouter } from './systemRouter';
import { guardRouter } from './guardRouter';
import { categoryRouter } from './categoryRouter';


const routes = Router();
// routes.use(guardRouter);
routes.use(userRouter);
routes.use(categoryRouter);
routes.use(systemRouter);

export { routes };
