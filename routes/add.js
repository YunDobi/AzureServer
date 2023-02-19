let express = require('express');
let router = express.Router();
const sql = require('mssql');

router.get('/', function (req, res) {
  let column = ['name', 'email', 'passowrd'];
  let VALUES = ['Alice', 'email1@mail.com', '123'];
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
    await sql.connect(config, async (err) => {
      // ... error checks
      const result = await sql.query`insert into clients (name, email, passowrd) VALUEs (${VALUES[0]}, ${VALUES[1]}, ${VALUES[2]});`;
      console.log(result.rowsAffected[0]);
      res.render('add', {clent: result.rowsAffected});
    });
  }
});
module.exports = router;
