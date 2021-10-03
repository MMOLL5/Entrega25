import express from 'express';
import {Router} from 'express';
import session from 'express-session';

const logInRouter = express.Router();

logInRouter.get('/', (req, res) => {
    res.render('login');
});

export default logInRouter;