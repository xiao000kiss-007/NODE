var http=require('http')
var url=require('url')
var model=require('./model/model.js')



http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    var pathname=url.parse(req.url).pathname.replace('/','');
    if (pathname!="favicon.ico") {
        try{
            model[pathname](req,res);
        }catch(err){
            model['home'](req,res);
            res.end();
        }
    }

}).listen(8001);

