// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { handleTokenRefresh } from '../controllers/refreshController.js';

const refreshRouter = Router();

refreshRouter.get('/', handleTokenRefresh);

export default refreshRouter;