
import { Router, Express } from 'express';
import authRouter from './auth'
import usersRouter from './user'
import { status } from '../database/config';

function routerApi(app: Express) {
  const router = Router();

  app.get('/api/health', (req, res) => {
    res.json({ success: true, status: { db: status.status } });
  });
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/user', usersRouter);
}

export default routerApi;