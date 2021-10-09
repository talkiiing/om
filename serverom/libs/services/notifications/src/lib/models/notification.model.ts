import { prop } from '@typegoose/typegoose';

export class Notification {
  @prop({ required: true })
  public issuer!: string;

  @prop({ required: true })
  public message!: string;
}
