import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import { Application } from '@feathersjs/express';
import { ServiceAddons } from '@feathersjs/feathers';
import { Services } from '@serverom/common/types';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Authentication]: AuthenticationService & ServiceAddons<any>;
  }
}

export function setupAuthenticationService(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use(Services.Authentication, authentication);
  app.configure(expressOauth());
}
