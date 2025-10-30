
import * as dotenv from 'dotenv';
import path from 'path';


dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // caminho correto para apps/backend/.env
});


import { app } from './app';

app.init();
