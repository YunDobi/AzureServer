let express = require('express');
let router = express.Router();
const sql = require('mssql');
require("dotenv").config();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
  console.log('Starting...');
  connectAndQuery();

  // eslint-disable-next-line func-style
  async function connectAndQuery() {
    try {
      let poolConnection = await sql.connect(config);

      console.log('Reading rows from the Table...');
      let resultSet = await poolConnection
        .request()
        .query(`SELECT top 5 * from [dbo]. [clients];`);

      console.log(`${resultSet.recordset.length} rows returned.`);
      console.log(resultSet.recordset);
      res.send(resultSet.recordset);

      poolConnection.close();
    } catch (err) {
      console.error(err.message);
    }
  }
});

module.exports = router;
