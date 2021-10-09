import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { Pipeline } from './models/pipeline.model';
import { PipelinesService } from './pipelines.class';
import { pipelinesHooks } from './pipelines.hooks';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Pipelines]: PipelinesService & ServiceAddons<any>;
  }
}

export function setupPipelineService(app: Application) {
  app.use(
    Services.Pipelines,
    new PipelinesService(
      {
        Model: getModelForClass(Pipeline),
        // paginate: messagePagination,
      },
      app
    )
  );

  const pipelinesService = app.service(Services.Pipelines);

  pipelinesService.hooks(pipelinesHooks);
}
