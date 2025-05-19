// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { renderLoginView, handleLogin } from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.route('/')
    .get(renderLoginView)
    .post(handleLogin);

export default loginRouter;

