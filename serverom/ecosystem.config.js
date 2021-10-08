module.exports = {
  apps: [
    {
      name: 'www-serverom',
      script: './dist/apps/www/main.js',
      instances: 1,
      env_production: {
        PORT: 1337,
      },
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '3.68.13.118',
      key: 'deploy.key',
      ref: 'origin/master',
      repo: 'git@github.com-deploy-serverom:talkiiing/om',
      path: '/home/ubuntu/apps/om',
      'post-deploy':
        'cd serverom && npm ci && pwd && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
