const express = require('express');
const app = express();
const sql = require('mssql');

app.get('/', function (req, res) {
  const config = {
    user: 'yunadmin', // better stored in an app setting such as process.env.DB_USER
    password: 'Aa468251973', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'yundemo.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'FirstDatabase', // better stored in an app setting such as process.env.DB_NAME
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

let server = app.listen(5100, function() {
  console.log("server is listiing in 5100");
});
