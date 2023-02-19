let express = require('express');
let router = express.Router();
const sql = require('mssql');
require("dotenv").config();

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
      .query(`SELECT * from [dbo]. [clients];`);

    console.log(`${resultSet.recordset.length} rows returned.`);
    console.log(resultSet.recordset);
    res.render('index',{clents: resultSet.recordset});

    poolConnection.close();
  } catch (err) {
    console.error(err.message);
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Starting...');
  connectAndQuery(req, res);

});

router.post('/', function (req, res) {
  let VALUES = [req.body.name, req.body.email, req.body.password];
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
  InsertAndQuery();
  connectAndQuery(req, res);

  // eslint-disable-next-line func-style
  async function InsertAndQuery() {
    await sql.connect(config, async (err) => {
      // ... error checks
      const result = await sql.query`insert into clients (name, email, passowrd) VALUEs (${VALUES[0]}, ${VALUES[1]}, ${VALUES[2]});`;
      console.log(result.rowsAffected[0]);
    });
  }
});

module.exports = router;
