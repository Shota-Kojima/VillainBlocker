'use strict';

const PORT = process.env.PORT || 3000;

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 


// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use("/public", express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// routeの設定
app.use("/", require("./routes/index.js"));


app.listen(PORT);