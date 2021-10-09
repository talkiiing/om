import { Service } from 'feathers-mongoose';
import { Application } from '@feathersjs/express';
import { Pipeline } from './models/computation.model';

export class PipelinesService extends Service<Pipeline> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }
}
