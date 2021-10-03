import { connect } from 'mongoose';

export const connectMongoose = async () => {
  const { MONGODB_CONNECTION_STRING } = process.env;
  await connect(MONGODB_CONNECTION_STRING);
  console.log('MongoDB connected');
};
