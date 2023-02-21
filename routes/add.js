let express = require('express');
let router = express.Router();
const sql = require('mssql');
let config = require('./config');

router.get('/', function (req, res) {
  res.render('add', { title: 'title' });
});

router.post('/', function (req, res) {

  try {
    console.log('Starting...');
    sql.connect(config, () => {
      let request = new sql.Request();
      console.log(req.body);
      request.input('name', req.body.name);
      request.input('email', req.body.email);
      request.input('password', req.body.password);
      request.input('visited', req.body.visited);
      request.query(
        `insert into [dbo].[clients] (name, email, password, visited) VALUES (@name, @email, @password, @visited);`,
        function (err, recordset) {
          if (err) {
            res.send(err);
          } else {
            console.log(recordset);
            res.status(200).render('updated', { item: recordset.recordset });
          }
        });
    });
  } catch (error) {
    console.error(error);
    res.send('try again');
  }
});

module.exports = router;
