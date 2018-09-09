var http = require('http')
var url =require('url')
var router=require('./models/router.js')
var fs = require('fs')
var myapi=require('./models/api')
http.createServer(function(request,response){
    // response.writeHead(200,{'Content-Type':'text/plain;charset=utf8'});
    response.writeHead(200,  {'Content-Type':'image/jpeg'}); 
    if (request.url!="/favicon.ico") {
        var pathname=url.parse(request.url).pathname;
        console.log(pathname);
        if (pathname=="/") {
            router.home(request,response); 
        }
        else{
            pathname=pathname.replace(/\//,'');
            console.log(pathname);
            router[pathname](request,response); 
        }
    // myapi.writefileSync("G:\\NodeJS\\NodeJS\\models\\aaa.txt","我觉得我还是很有天赋的");
    //response.write('hello,world');//不能向客户端输出任何字节  
    myapi.readimg('./images/logo.png',response);    
    }
    console.log('继续执行');
}).listen(8888);
console.log("服务器运行在http://127.0.0.1:8888/");


