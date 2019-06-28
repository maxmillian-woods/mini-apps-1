const express = require('express');
const fs = require('fs');
var path = require('path');
var app = express();

app.set('port', 3000);
app.use(express.static('public'));


app.listen(app.get('port'), () =>
  console.log('Listening on ' + app.get('port'))
);