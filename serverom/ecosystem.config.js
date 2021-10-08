module.exports = {
  apps: [
    {
      name: 'www-gateway',
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
      // key: '~/.ssh/gh-actions-deploy-key.pem',
      ref: 'origin/master',
      repo: 'https://github.com/roamiiing/om',
      path: '/home/ubuntu/apps/om',
      'post-deploy':
        'cd serverio && npm ci && pwd && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
