import { config } from 'dotenv';
config();

export const environment = {
  production: false,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  clientURL: process.env.CLIENT_URL || 'https://om.talkiiing.ru',
  datahubURL:
    process.env.DATAHUB_URL || 'http://datahub.yc.pbd.ai:9002/api/graphql',
  authentication: {
    entity: 'user',
    service: 'users',
    secret: process.env.JWT_SECRET,
    authStrategies: ['jwt', 'auth0'],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: process.env.HOST || 'localhost',
      issuer: 'serverom',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    oauth: {
      redirect: '/',
      auth0: {
        key: process.env.AUTHZERO_KEY,
        secret: process.env.AUTHZERO_SECRET,
        subdomain: process.env.AUTHZERO_SUBDOMAIN,
        scope: ['openid', 'profile', 'email'],
      },
    },
  },
};
