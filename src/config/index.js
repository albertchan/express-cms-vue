module.exports = {
  host: process.env.HOST || process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 3000,

  api: {
    port: process.env.PORT ? process.env.PORT + 1 : 3001
  }
};
