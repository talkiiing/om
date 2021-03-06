import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Dataset } from '@serverom/services/datasets';
import { Feature } from '@serverom/services/features';
import { User } from '@serverom/services/users';

export class Step {
  @prop({ required: true, ref: () => Feature })
  public feature!: Ref<Feature>;

  @prop({ required: true })
  public meta!: Record<string, string>;
}

export class Pipeline {
  @prop({ required: true, ref: () => Dataset })
  public initialDataset!: Ref<Dataset>;

  @prop({ ref: () => Dataset })
  public pairDataset!: Ref<Dataset>;

  @prop({ required: true, type: [Step] })
  public steps!: Step[];

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;

  @prop({ required: true })
  public name!: string;

  @prop()
  public description?: string;
}
