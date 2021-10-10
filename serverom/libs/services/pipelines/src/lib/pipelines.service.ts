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
  app.get('/download/' + Services.Pipelines + '/:id', async (req, res) => {
    const data: Pipeline = await app.services[Services.Pipelines].get(
      req.params.id
    );

    res.setHeader(
      'Content-disposition',
      // @ts-ignore
      'attachment; filename=pipeline-' + data._id + '.json'
    );
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    res.write(JSON.stringify(data, null, 2));

    return res.end();
  });

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
