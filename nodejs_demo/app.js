var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');
var events=require('events');
var ejs=require('ejs');
var router=require('./model/router.js');

// var EventEmitter=new events.EventEmitter();
// EventEmitter.on('getmime',function (result) {
//     console.log("接收到广播事件");
//     console.log(result);
// })
// ModelMime.getMimefromfileA(".js",EventEmitter);

http.createServer(function(req,res){
    // router.statics(req,res,"static");
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    var pathname=url.parse(req.url,true).pathname;
    var method=req.method.toLowerCase();
    // console.log(method);
    if (pathname!="/favicon.ico") {
        console.log(pathname);
        if (pathname=="/login") {
            ejs.renderFile("./views/form.ejs",
            {

            },
            function(err,data){
                res.end(data);
            })

       
        }else if(pathname=="/register" ) {

            ejs.renderFile("./views/register.ejs",
            {   

            },
            function(err,data){
                res.end(data);
            })
        }else if(pathname=="/dologin" && method=="get"){
            console.log(url.parse(req.url,true).query);
            res.end("dologin");
        }else if(pathname=="/dologin" && method=="post"){
            postStr="";
            req.on("data",function(chunk){
                postStr+=chunk;
            });
            req.on("end",function(err,chunk){
                console.log(postStr);
                res.end("<script>alert('登入成功');history.back()</script>");
            });
        }else{
            ejs.renderFile("./views/index.ejs",
            {

            },
            function (err,data) {
                    res.end(data);
                }
            );
        }
    }
    
       
    
}).listen(8001);
