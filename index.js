var http=require('http')
var app=require('./src/index');

const port=3000;
const host='127.0.0.1';

const server=http.createServer(app)

server.listen(port,host)