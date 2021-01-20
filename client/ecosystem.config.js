module.exports = {
  apps: [
    {
      name: 'future voices frontend',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        HOST: '127.0.0.1',
        PORT: 8096
      }
    }
  ]
};
