var express = require('express');
var path = require('path');
var fs = require('fs');
const mysql = require('mysql')

var app = express();

app.set('port', 3000);
app.use(express.static('public'));

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3000',
  user: 'root',
  password: 'maxman',
  database: 'shop'

});

connection.connect();

app.post('/', (req, res, next) => {
  console.log(req.body);
  var message = {
    render: '',
    name: '',
    email: '',
    password: '',
    shipping: '',
    phone: '',
    cc: '',
    ed: '',
    cvv: '',
    billing: '',

  };

  var q = `INSERT INTO info 
                (name, email, password, shipping, phone, cc, ed, cvv, billing, zip)
                VALUES  
                ('${message.name}', '${message.email}', '${message.password}', 
                '${message.shipping}', '${message.phone}', '${message.cc}', 
                '${message.ed}', '${message.cvv}', '${message.billing}', '${message.zip}')`

  connection.query(q, message,
    (err, result) => {
      if (err) throw err;
      console.log('here');
      res.send(result.insertId);
    }
  );
})

app.listen(app.get('port'), () =>
  console.log('Listening on ' + app.get('port'))
);