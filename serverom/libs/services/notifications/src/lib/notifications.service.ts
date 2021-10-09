import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { Notification } from './models/notification.model';
import { NotificationsService } from './notifications.class';
import { notificationsHooks } from './notifications.hooks';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Notifications]: NotificationsService & ServiceAddons<any>;
  }
}

export function setupNotificationsService(app: Application) {
  app.use(
    Services.Notifications,
    new NotificationsService(
      {
        Model: getModelForClass(Notification),
        // paginate: messagePagination,
      },
      app
    )
  );

  const notificationsService = app.service(Services.Notifications);

  notificationsService.hooks(notificationsHooks);
}
