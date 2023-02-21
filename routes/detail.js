let express = require('express');
let router = express.Router();
const sql = require('mssql');
const config = require('./config');

router.get('/:id', async function (req, res) {
  try {
    let poolConnection = await sql.connect(config);

    console.log('Reading rows from the Table...');
    let resultSet = await poolConnection
      .request()
      .query(`select * from clients where id = ${req.params.id}`);
    console.log(resultSet.recordset);
    res.render('detail', { item: resultSet.recordset });
  } catch (error) {
    console.error(error);
  }
});

router.post('/:id', async function (req, res) {
  let VALUES = [req.body.name, req.body.email, req.body.password, req.body.visited, req.body.id];
  console.log("body",req.body, VALUES);
  try {
    sql.connect(config, () => {
      let request = new sql.Request();
      request.input("id", req.params.id);
      request.query(
        'update [dbo].[clients] set clients.name =' + '\'' + VALUES[0] + '\'' + ', clients.email=' + '\'' + VALUES[1] + '\'' + ', clients.visited= ' + '\'' + VALUES[3] + '\'' + ', clients.password=' + '\'' + VALUES[2] + '\'' + 'where [dbo].[clients].id = @id;');
      request.query(
        `select * from clients where id = ${VALUES[4]};`,
        function (err, recordset) {
          if (err) {
            res.send(err);
          } else {
            console.log(recordset.recordset);
            res.status(200).render('updated', {item: recordset.recordset});
          }
        }
      );
      // res.send(request);
    });
  } catch (error) {
    console.error(error);
    res.send("try again");
  }
});

module.exports = router;
