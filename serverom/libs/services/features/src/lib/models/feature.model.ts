import { prop, Ref } from '@typegoose/typegoose';
import { User } from '@serverom/services/users';

export class MetaItem {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ default: 'text' })
  public inputType!: string;
}

export class Feature {
  @prop({ required: true })
  public source!: string;

  @prop({ default: 'js' })
  public sourceType!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ default: false })
  public requiresPairDataset!: boolean;

  @prop({ required: true, type: [MetaItem] })
  public meta!: MetaItem[];

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;
}
