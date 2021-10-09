import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { DatahubDatasetModel } from './models/datahub-dataset.model';

export class DatasetsService extends Service<DatahubDatasetModel> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
}
