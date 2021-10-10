import * as feathersAuthentication from '@feathersjs/authentication';
import { discard, populate } from 'feathers-hooks-common';
import { Services, setUser } from '@serverom/common/types';

const { authenticate } = feathersAuthentication.hooks;

export const datasetsHooks = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [authenticate('jwt'), setUser()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [
      discard('data'),
      populate({
        schema: {
          include: {
            service: Services.Users,
            nameAs: 'user',
            parentField: 'user',
            childField: '_id',
          },
        },
      }),
    ],
    get: [
      populate({
        schema: {
          include: {
            service: Services.Users,
            nameAs: 'user',
            parentField: 'user',
            childField: '_id',
          },
        },
      }),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
