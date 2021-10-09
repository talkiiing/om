import { prop } from '@typegoose/typegoose';

export class Dataset {
  @prop({ required: true })
  public data!: any;

  @prop()
  public name!: string;
}
