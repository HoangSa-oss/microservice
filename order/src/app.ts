import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@saigon/common';
import { deleteOrderRouter } from './router/detele';
import { indexOrderRouter } from './router/index';
import { newOrderRouter } from './router/new';
import { showOrderRouter } from './router/show';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(deleteOrderRouter)
app.use(indexOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)
app.all('*', async (req, rdeleteOrderRouteres) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };