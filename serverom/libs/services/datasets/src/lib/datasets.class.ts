import { Service } from 'feathers-mongoose';
import { Dataset } from './models/dataset.model';
import { Params } from '@feathersjs/feathers';
import axios from 'axios';
import { CreateDatasetDto } from './models/create-dataset.dto';
import { Services, Application } from '@serverom/common/types';
import { Pipeline } from '@serverom/services/pipelines';
import { Feature } from '@serverom/services/features';

export class DatasetsService extends Service<Dataset> {
  app: Application;

  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async create(data: CreateDatasetDto, params?: Params): Promise<Dataset> {
    // from url
    if (data.source) {
      const { data: result } = await axios.get(data.source);

      return (await super.create(
        {
          name: data.name,
          data: result,
        },
        params
      )) as Dataset;
    }

    // from data directly
    if (data.data) {
      return (await super.create({
        name: data.name,
        data: data.data,
      })) as Dataset;
    }

    (async () => {
      // from pipeline
      const pipeline = (await this.app.services[Services.Pipelines].get(
        data.pipeline
      )) as Pipeline;

      const { steps, initialDataset, pairDataset } = pipeline;

      const { data: initialDatasetData } = (await this.app.services[
        Services.Datasets
      ].get(initialDataset)) as Dataset;
      const { data: pairDatasetData } = pairDataset
        ? ((await this.app.services[Services.Datasets].get(
            pairDataset
          )) as Dataset)
        : { data: null };

      const fns = await Promise.all(
        steps.map(async ({ meta, feature }) => {
          const { source } = (await this.app.services[Services.Features].get(
            feature
          )) as Feature;

          const fn = eval(source) as (
            meta: Record<string, string>,
            initialData: Dataset['data'],
            pairData?: Dataset['data']
          ) => any;

          return { fn, meta };
        })
      );

      const newData = fns.reduce(
        (result, { meta, fn }) => fn(meta, result, pairDatasetData),
        initialDatasetData
      );

      super.create({
        pipeline: data.pipeline,
        name: data.name,
        data: newData,
      });
    })();

    return {
      // @ts-ignore
      pending: true,
    };
  }
}
