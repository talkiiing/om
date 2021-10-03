import { listen } from './app';
import { connectMongoose } from './persistence/mongoose.connection';

(async () => {
  await connectMongoose();
  await listen();
})();
