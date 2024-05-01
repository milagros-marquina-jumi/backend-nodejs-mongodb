
import { Router, Express } from 'express';
import authRouter from './auth'
import usersRouter from './user'

 function routerApi(app:Express) {

  const router =  Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/user', usersRouter);
  
}

export default routerApi