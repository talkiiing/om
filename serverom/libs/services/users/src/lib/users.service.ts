import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { User } from './models/user.model';
import { UsersService } from './users.class';
import { usersHooks } from './users.hooks';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Users]: UsersService & ServiceAddons<any>;
  }
}

export function setupUsersService(app: Application) {
  console.log('registering users');
  app.use(
    Services.Users,
    new UsersService(
      {
        Model: getModelForClass(User),
        // paginate: messagePagination,
      },
      app
    )
  );

  const usersService = app.service(Services.Users);

  usersService.hooks(usersHooks);
}
