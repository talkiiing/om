import { HookContext } from '@feathersjs/feathers';

export const setUser = () => (ctx: HookContext) => {
  ctx.data.user = ctx.params.user._id;
  return ctx;
};
