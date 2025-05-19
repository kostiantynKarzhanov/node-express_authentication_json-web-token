// ----- import built-in modules -----
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// ----- import config modules -----
import { port, dbString } from './config/defaultsConfig.js';
import connectDatabase from './config/connectDatabase.js';
import { loadKeyPair } from './config/keyPairConfig.js';

// ----- import utils -----
import { stopServer } from './utils/serverUtils.js';

// ----- import routers -----
import indexRouter from './routers/indexRouter.js';
import loginRouter from './routers/loginRouter.js';
import refreshRouter from './routers/refreshRouter.js';
import logoutRouter from './routers/logoutRouter.js';
import registerRouter from './routers/registerRouter.js';
import protectedRouter from './routers/protectedRouter.js';

// ----- import middleware -----
import generalErrorHandler from './middleware/generalErrorHandler.js';

// ----- initial setup ----- 
const __dirname = dirname(fileURLToPath(import.meta.url));
const databaseConnectionTimeout = setTimeout(stopServer, 3000, 'Database connection timeout.');

connectDatabase(dbString);

// ----- configure the app -----
const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('x-powered-by', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----- define app routes -----
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/protected', protectedRouter);

// ----- set error handler -----
app.use(generalErrorHandler);

// ----- run server if database successfully connected -----
mongoose.connection.once('connected', async () => {
    clearTimeout(databaseConnectionTimeout);

    // load or create PUBLIC and PRIVATE keys if not exist
    await loadKeyPair();

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});