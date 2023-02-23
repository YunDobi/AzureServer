let express = require('express');
let router = express.Router();
const sql = require('mssql');

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
// eslint-disable-next-line func-style
async function connectAndQuery(req, res) {
  try {
    let poolConnection = await sql.connect(config);

    console.log('Reading rows from the Table...');
    let resultSet = await poolConnection
      .request()
      .query(`DROP Table [dbo]. [clients];`);

    let resultSet2 = await poolConnection
      .request()
      .query(`CREATE TABLE clients (
        id int identity(1,1) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        visited varchar(255) NOT NULL
      );`);
    let resultSet3 = await poolConnection
      .request()
      .query(`SELECT * from clients`);

    console.log(`${resultSet.recordset} rows returned.`);
    resultSet();
    resultSet2();
    resultSet3();
    res.render('reset', {title: "reseted"});

    poolConnection.close();
  } catch (err) {
    console.error(err.message);
  }
}

router.get('/', function(req, res) {

  connectAndQuery(req, res);

});
module.exports = router;
