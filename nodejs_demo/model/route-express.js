var url=require('url')
var fs=require('fs')
function changeRes(res){
    res.send=function(data){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.end(data);
    };
}
//暴露的模块
var Server=function(){
    G=this; /*全局变量*/
     //处理get和post请求
    this._get={};
    this._post={};
   
    var app=function(req,res){
        // console.log(app);
        changeRes(res);
        var pathname=url.parse(req.url).pathname;
        if (!pathname.endsWith("/")){
            pathname+="/";
        } 
        // console.log(pathname);
        var method=req.method.toLowerCase();/* 拿到请求方式*/
        // console.log(method);
        if (G["_"+method][pathname]) {
           if (method=="post") {
            postStr="";
            req.on("data",function(chunk){
                postStr+=chunk;
            });
            req.on("end",function(){
                // console.log(postStr);
                fs.appendFile("./login.txt",
                    postStr+"\n",
                    function(err,data){
                        if(err){
                            console.log(err);
                            return;
                        }
                        req.body=postStr;/*表示拿到post的值*/
                        G['_'+method][pathname](req,res); /*执行方法*/
                        
                    })
                
                });
           }else{ /*执行get请求*/
            G['_'+method][pathname](req,res); /*执行方法*/

        }
        }
        else {

            res.end('no router');
        }
    
    };
    app.get=function(string,callback){
        if(!string.endsWith("/")){
            string+="/";
        }
        if(!string.startsWith("/")){
            string="/"+string;
        }
        G["_get"][string]=callback;
        
    };
    app.post=function(string,callback){
        if(!string.endsWith("/")){
            string+="/";
        }
        if(!string.startsWith("/")){
            string="/"+string;
        }
        G["_post"][string]=callback;
       
    };
    return app;
}
module.exports=Server();
