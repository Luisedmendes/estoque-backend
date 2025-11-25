import { GenerateKeyControllerController } from '@modules/system/services/generateKey/GenerateKeyController';
import { Router } from 'express';
import multer from 'multer';
import { storageConfig } from '@config/storage';
import { CreateFileController } from '@modules/system/services/createFile/CreateFileController';
import { ListFileController } from '@modules/system/services/listFile/ListFileController';
import { CreateFolderController } from '@modules/system/services/createFolder/CreateFolderController';

const systemRouter = Router();
const systemController = new GenerateKeyControllerController();
const createFileController = new CreateFileController();
const createFolderController = new CreateFolderController();
const listFileController = new ListFileController()
const upload = multer(storageConfig.config.multer);


systemRouter.route('/generate-keys').post(systemController.handle);


systemRouter
  .route('/files')
  .post(upload.fields([{ name: 'files' }]), createFileController.handle)
  .get(listFileController.handle);


systemRouter
  .route('/folders')
  .post(createFolderController.handle)

export { systemRouter };
