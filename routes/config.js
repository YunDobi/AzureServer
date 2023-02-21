const config = {
  user: process.env.user, // better stored in an app setting such as process.env.DB_USER
  password: process.env.password, // better stored in an app setting such as process.env.DB_PASSWORD
  server: process.env.server, // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: process.env.database, // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: 'default',
  },
  options: {
    encrypt: true,
  },
};
module.exports = config;