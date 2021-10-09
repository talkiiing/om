import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { DatahubDatasetModel } from './models/datahub-dataset.model';
import { DatasetsService } from './datahub-datasets.class';
import { datahubDatasetsHooks } from './datahub-datasets.hooks';

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
        Model: getModelForClass(DatahubDatasetModel),
        // paginate: messagePagination,
      },
      app
    )
  );

  const datasetsService = app.service(Services.Datasets);

  datasetsService.hooks(datahubDatasetsHooks);
}
