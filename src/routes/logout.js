import express from 'express';
import {Router} from 'express';
import session from 'express-session';

const logOutRouter = express.Router();

logOutRouter.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.redirect('/login');
        else res.send({ status: 'Logout ERROR', body: err });
      });
});

export default logOutRouter;