var express = require('express');
var path = require('path');
var fs = require('fs');
var parser = require('body-parser');

var app = express();

app.set('port', 3000);
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.post('/', function (req, res) {
  fs.open(path.join(__dirname + 'data.csv'), 'w', () => {
    var body = req.body.text;
    if (body[body.length - 1] === ';') {
      body = body.slice(0, -1)
    };
    var data = JSON.parse(body);
    var sep = ',';
    var header = '';
    for (key in data) {
      if (key !== 'children') {
        header = header + key + sep;
      };
    };
    header = header.slice(0, -1) + '\n';
    fs.appendFile('data.csv', header, () => {
      var rows = '';
      var recurse = function (data) {
        if (!data.children) {
          return;
        }
        var row = '';
        for (key in data) {
          if (key !== 'children') {
            row = row + data[key] + sep;
          }
        }
        row = row.slice(0, -1) + '\n';
        rows = rows + row;
        for (var i = 0; i < data.children.length; i++) {
          recurse(data.children[i]);
        }
      }
      recurse(data);
      fs.appendFile('data.csv', rows, () => {
        fs.readFile(path.join(__dirname + 'data.csv'), (err, data) => res.send(data));
      });
    });
  });
});

app.listen(app.get('port'), () =>
  console.log('Listening on ' + app.get('port'))
);