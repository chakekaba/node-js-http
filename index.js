'use strict';
const http = require('http');

/**
 * サーバの作成
 * req : リクエストを表すオブジェクトの引数
 * res : レスポンスを表すオブジェクトの引数
 */
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            const fs = require('fs');
            const rs = fs.createReadStream('./form.html');
            rs.pipe(res);//読み込み用Streamと書き込み用Streamをつないで、そのままデータを受け渡す
            break;
        case 'POST':
            let rawData = '';
            req.on('data', (chunk) => {
                rawData = rawData + chunk;
            }).on('end', () => {
                const decoded = decodeURIComponent(rawData);
                console.info(`[${now}] 投稿：${decoded}`);
                res.write(`<!DOCTYPE html><html lang="ja"><body><h1>
                    ${decoded}が投稿されました</h1></body></html>`);
                res.end();//通信終了、POSTメソッドを使った場合のみres.endを行う
            });
            break;
        default:
            break;//req.method に該当がない場合、break
    }
}).on('error', (e) => {
    console.error(`[ ${new Date()} ] Server Error`, e);
}).on('clientError', (e) => {
    console.error(`[ ${new Date()} ] Client Error`, e);
});

// HTTPが起動するポートを宣言
const port = 8000;
// サーバを起動して、起動した際に実行する関数を渡す
server.listen(port, () => {
    console.log('Listening on ' + port);
});

/**
 * console.log(): デバッグ用のログ
 * console.info(): 情報。普段から残しておきたい情報に使う
 * console.warn(): 警告。問題となる可能性がある情報に使う
 * console.error(): エラー。直ちに対応が必要な情報に使う
 */