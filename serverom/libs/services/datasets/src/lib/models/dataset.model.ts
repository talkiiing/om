import { prop, Ref } from '@typegoose/typegoose';
import { Pipeline } from '@serverom/services/pipelines';
import { User } from '@serverom/services/users';

export class Dataset {
  @prop({ required: true })
  public data!: any;

  @prop()
  public name!: string;

  @prop({ ref: () => Pipeline })
  public pipeline?: Ref<Pipeline>;

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;
}
