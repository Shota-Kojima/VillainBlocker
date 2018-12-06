'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('POSTでアップロードしてください。'));

app.post('/', (req, res) => {
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
        fs.writeFile('./img.jpeg', req.rawBody, 'utf-8',(err) => {
            if(err) return;
            console.log(`[done] Image save`);
        });
    });
});

app.listen(PORT);