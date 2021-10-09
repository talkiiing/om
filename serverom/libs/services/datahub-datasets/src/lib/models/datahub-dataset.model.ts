import { prop } from '@typegoose/typegoose';

export class DatahubDataset {
  @prop({ required: true })
  public source!: string;
}
