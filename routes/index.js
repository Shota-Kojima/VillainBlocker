var router = require("express").Router();
const fs = require('fs');
const line = require('@line/bot-sdk');
const moment = require('moment');
const config = require('config');
const multer = require('multer')
var upload = multer({ dest: './uploads/' });

const LineData = {
    channelSecret: config.get('Line.CHANNELSECRET'),
    channelAccessToken: config.get('Line.ACCESSTOKEN')
};

//get 
router.get("/", (req, res) => {
    // index.ejsをレンダリング
    res.render("../public/test.ejs");
});

//post
router.post('/', upload.fields([ { name: 'data' } ]), function(req, res, next) {
    // console.log(req.body);
    var path = req.files.data[0].path;
    var filename = req.files.data[0].filename;
    var originalname = req.files.data[0].originalname;
    var targetPath = './uploads/' + originalname;
    console.log(path, filename, originalname);

    fs.rename(path, targetPath, function(err) {
      if (err) {
        throw err;
      }
      fs.unlink(path, function() {
        if (err) {
          throw err;
        }
        res.send('File uploaded to: ' + targetPath + ' - ' + req.files.data[0].size + ' bytes');
      });
    });
  });
  

module.exports = router;