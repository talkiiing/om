import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  public email!: string;

  @prop()
  public auth0Id!: string;
}
