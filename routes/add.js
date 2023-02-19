let express = require('express');
let router = express.Router();
const sql = require('mssql');

router.get('/', function(req, res) {
  
  res.render('add', {title: "title"});
});
module.exports = router;
