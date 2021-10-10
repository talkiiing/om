import { ServiceAddons } from '@feathersjs/feathers';
import { getModelForClass } from '@typegoose/typegoose';
import { Application, Services } from '@serverom/common/types';
import { Feature } from './models/feature.model';
import { FeaturesService } from './features.class';
import { featuresHooks } from './features.hooks';
import { Dataset } from '@serverom/services/datasets';

declare module '@serverom/common/types' {
  interface ServiceTypes {
    [Services.Features]: FeaturesService & ServiceAddons<any>;
  }
}

export function setupFeaturesService(app: Application) {
  app.get('/download/' + Services.Features + '/:id', async (req, res) => {
    const data: Feature = await app.services[Services.Features].get(
      req.params.id
    );

    res.setHeader(
      'Content-disposition',
      // @ts-ignore
      'attachment; filename=om-' + data._id + '.json'
    );

    res.write(JSON.stringify(data));
    return res.end();
  });

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
