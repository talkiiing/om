import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { Paginated, Params } from '@feathersjs/feathers';
import { User } from './models/user.model';

export class UsersService extends Service<User> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
  //
  // find(params?: Params): Promise<any[] | Paginated<any>> {
  //   console.log('find users');
  //   return super.find(params);
  // }
  create(data: Partial<User> | Partial<User>[], params?: Params): Promise<User[] | User> {
    console.log(data);
    return super.create(data, params);
  }
}
