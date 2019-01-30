'use strict';

const PORT = process.env.PORT || 8000;

var express = require("express");
var app = express();

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use("/public", express.static(__dirname + "/public"));

// routeの設定
app.use("/", require("./routes/index.js"));


app.listen(PORT);