// ----- import built-in modules -----
import { Router } from 'express';

// ----- import middleware -----
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

// ----- import controllers -----
import { handleProtectedView } from '../controllers/protectedController.js';

const protectedRouter = Router();

protectedRouter.get('/', authenticateMiddleware, handleProtectedView);

export default protectedRouter;