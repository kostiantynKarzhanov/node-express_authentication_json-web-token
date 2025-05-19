// ----- import built-in modules -----
import { Router } from 'express';

// ----- import middleware -----
import clearCookieMiddleware from '../middleware/clearCookieMiddleware.js';

// ----- import controllers -----
import { handleLogout } from '../controllers/logoutController.js';

const logoutRouter = Router();

logoutRouter.post('/', clearCookieMiddleware, handleLogout);

export default logoutRouter;