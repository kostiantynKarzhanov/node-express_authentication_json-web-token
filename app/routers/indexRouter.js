// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { renderIndexView } from '../controllers/indexController.js'

const indexRouter = Router();

indexRouter.get('/', renderIndexView);

export default indexRouter;