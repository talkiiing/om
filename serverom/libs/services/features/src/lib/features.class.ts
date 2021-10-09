import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { Feature } from './models/feature.model';

export class FeaturesService extends Service<Feature> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
}
