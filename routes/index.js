var router = require("express").Router();
const fs = require('fs');
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // 保存したいパス
//       cb(null, './img.jpg')
//     }
//     ,
//     filename: function (req, file, cb) {
//       // アップロードしたときのファイル名で保存
//       cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

//get 
router.get("/", (req, res) => {
    // index.ejsをレンダリング
    res.render("../public/test.ejs");
});

//post
router.post("/", (req, res) => {
    
    let buffers = [];
    let cnt = 0;

    req.on('data', (chunk) => {
        buffers.push(chunk);
        console.log(++cnt);
    });

    req.on('end', () => {
        console.log(`[done] Image upload`);
        req.rawBody = Buffer.concat(buffers);
        //書き込み
        fs.writeFile('./img.jpg', req.rawBody, 'utf-8',(err) => {
            if(err) return;
            console.log(`[done] Image save`);
        });
    });
});

// router.post('/', upload.single('file'), function(req, res, next) {

//     // POSTされた画像の情報をJSONで取得
//     const req_file_json = JSON.stringify(req.file)
  
//   　　　　// ***************
//     // お好きな処理をここに
//   　　　　// ***************
  
//     res.json({'result': 'success!'})
//   })

module.exports = router;