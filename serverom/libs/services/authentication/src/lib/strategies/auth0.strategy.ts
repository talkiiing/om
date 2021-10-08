import { Params } from '@feathersjs/feathers';

import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';

export class Auth0Strategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      email: profile.email,
    };
  }
}
