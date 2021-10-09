import { prop, Ref } from '@typegoose/typegoose';
import { Pipeline } from '@serverom/services/pipelines';

export class Dataset {
  @prop({ required: true })
  public data!: any;

  @prop()
  public name!: string;

  @prop({ ref: () => Pipeline })
  public pipeline?: Ref<Pipeline>;
}
