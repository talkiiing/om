import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public auth0Id!: string;

  @prop()
  public group?: string;
}
