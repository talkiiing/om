import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { Notification } from './models/notification.model';

export class NotificationsService extends Service<Notification> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
}
