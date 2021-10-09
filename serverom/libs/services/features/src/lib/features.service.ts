import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { Feature } from './models/feature.model';
import { FeaturesService } from './features.class';
import { featuresHooks } from './features.hooks';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Features]: FeaturesService & ServiceAddons<any>;
  }
}

export function setupFeaturesService(app: Application) {
  console.log('registering features');
  app.use(
    Services.Features,
    new FeaturesService(
      {
        Model: getModelForClass(Feature),
        // paginate: messagePagination,
      },
      app
    )
  );

  const featuresService = app.service(Services.Features);

  featuresService.hooks(featuresHooks);
}
