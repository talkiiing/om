import feathers from '@feathersjs/feathers';
import feathersExpress from '@feathersjs/express';
import * as express from 'express';
import { setupUsersService } from '@serverom/services/users';
import { environment } from './environments/environment';
import { setupAuthenticationService } from '@serverom/services/authentication';
import { Application } from '@serverom/common/types';

export const app: Application = feathersExpress(feathers());

app.set('authentication', environment.authentication);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.configure(feathersExpress.rest());

app.configure(setupUsersService);
app.configure(setupAuthenticationService);

app.use(feathersExpress.notFound());
app.use(feathersExpress.errorHandler());

export const listen = () =>
  new Promise<void>((res) => {
    const listener = app.listen(process.env.PORT || 8080, () => {
      console.log('Listening on', listener.address());
      res();
    });
  });
