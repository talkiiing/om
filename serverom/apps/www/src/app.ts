import feathers from '@feathersjs/feathers';
import feathersExpress from '@feathersjs/express';
import * as express from 'express';
import { environment } from './environments/environment';
import { Application } from '@serverom/common/types';
import cors from 'cors';
import { setupServices } from './services';

export const app: Application = feathersExpress(feathers());

Object.entries(environment).forEach(([key, value]) => app.set(key, value));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.configure(feathersExpress.rest());

app.configure(setupServices);

app.get('/', (req, res) =>
  res.redirect(req.query.redirect || environment.clientURL)
);

app.use(feathersExpress.notFound());
app.use(feathersExpress.errorHandler());

export const listen = () =>
  new Promise<void>((res) => {
    const listener = app.listen(process.env.PORT || 8080, () => {
      console.log('Listening on', listener.address());
      res();
    });
  });
