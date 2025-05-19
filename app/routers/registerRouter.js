// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { renderRegisterView, handleRegister } from '../controllers/registerController.js';

const registerRouter = Router();

registerRouter.route('/')
    .get(renderRegisterView)
    .post(handleRegister);

export default registerRouter;

