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
        'Content-Type': 'text/plain; charset=utf-8'
    });
    switch (req.method) {
        case 'GET':
            res.write('GET ' + req.url);
            break;
        case 'POST':
            res.write('POST ' + req.url);
            let rawData = '';
            req.on('data', (chunk) => {
                rawData = rawData + chunk;
            }).on('end', () => {
                console.info(`[${now}] Data posted: ${rawData}`);
            });
            break;
        default:
            break;//req.method に該当がない場合、break
    }
    res.end();//通信終了
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