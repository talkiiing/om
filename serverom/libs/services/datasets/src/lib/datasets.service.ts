import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { Dataset } from './models/dataset.model';
import { DatasetsService } from './datasets.class';
import { datasetsHooks } from './datasets.hooks';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Datasets]: DatasetsService & ServiceAddons<any>;
  }
}

export function setupDatasetsService(app: Application) {
  app.use(
    Services.Datasets,
    new DatasetsService(
      {
        Model: getModelForClass(Dataset),
        // paginate: messagePagination,
      },
      app
    )
  );

  const datasetsService = app.service(Services.Datasets);

  datasetsService.hooks(datasetsHooks);
}
