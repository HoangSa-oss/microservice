import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@saigon/common';
import { createTicketRouter } from './router/new';
import { showTicker } from './router/show';
import { indexTicketRouter } from './router';
import { updateTicketRouter } from './router/update';
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

app.use(createTicketRouter);
app.use(showTicker)
app.use(indexTicketRouter)
app.use(updateTicketRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };