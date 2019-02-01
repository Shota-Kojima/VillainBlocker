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
const client = new line.Client(LineData);
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
    var url = "https://villainblocker.azurewebsites.net/uploads/" + filename
    console.log(path, filename, originalname);

    fs.rename(path, targetPath, function(err) {
      if (err) {
        throw err;
      }
      fs.unlink(path, function() {
        if (err) {
          throw err;
        }
        data = returnMsg(url);
        // var data = {
        //     type: 'text',
        //     text: 'hello, world',
        //   }
        console.log("-----------------------------------------");
        console.log("返信 START");
        console.log("-----------------------------------------");
        client.pushMessage("U872741bbbd8e5f3693c938f0111ca98a",data);

        res.send('File uploaded to: ' + targetPath + ' - ' + req.files.data[0].size + ' bytes');
      });
    });
  });
  
//----------------------------------------------
//返信するやつ
//----------------------------------------------

function returnMsg(url){
    console.log("-----------------------------------------");
    console.log("returnMsg START");
    console.log("-----------------------------------------");
    var a = [
        {  
            "type": "flex",
            "altText": "訪問者情報",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    // "url": "https://cdn.discordapp.com/attachments/441216746448486402/534993065853845504/DSCF2712.jpg",
                    "url": url,
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                        "type": "text",
                        "text": "訪問者情報",
                        "weight": "bold",
                        "size": "xl"
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "lg",
                        "contents": [
                        {
                            "type": "text",
                            "text": "平均ブロック率",
                            "color": "#000000",
                            "size": "lg",
                            "flex": 2
                        },
                        {
                            "type": "text",
                            "text": "80％",
                            "size": "lg",
                            "color": "#FE0303",
                            "margin": "md",
                            "flex": 0
                        }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "spacing": "sm",
                        "contents": [
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                            {
                                "type": "text",
                                "text": "訪問時刻",
                                "color": "#000000",
                                "size": "lg",
                                "flex": 2
                            },
                            {
                                "type": "text",
                                "text": moment().format("MM月DD日HH時mm分"),
                                "wrap": true,
                                "color": "#000000",
                                "size": "lg",
                                "margin": "md",
                                "flex": 0
                            }
                            ]
                        }
                        ]
                    }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                    {
                        "type": "button",
                        "style": "secondary",
                        "color": "#5199FC",
                        "height": "sm",
                        "action": {
                            "type": "uri",
                            "label": "詳細情報",
                            "uri": "https://linecorp.com"
                        }
                    },
                      
                    {
                        "type": "button",
                        "style": "secondary",
                        "color": "#44FD3B",
                        "height": "sm",
                        "action": {
                            "type": "postback",
                            "label": "許可する",
                            "data": "HOMON_OK"
                        }
                    },
                    {
                        "type": "button",
                        "style": "secondary",
                        "color": "#FD4646",
                        "height": "sm",
                        "action": {
                            "type": "postback",
                            "label": "拒否する",
                            "data": "HOMON_NO"
                        }
                    },
                    {
                        "type": "spacer",
                        "size": "sm"
                    }
                ],
                "flex": 0
                }
            }
        }
    ];
    return a;
};

module.exports = router;