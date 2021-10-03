export const environment = {
  production: false,
  authentication: {
    entity: 'user',
    service: 'users',
    secret: process.env.JWT_SECRET,
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      issuer: 'serverom',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: 'username',
      passwordField: 'password',
    },
  },
};
