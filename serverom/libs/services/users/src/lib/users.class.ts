import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { User } from './models/user.model';

export class UsersService extends Service<User> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
}
