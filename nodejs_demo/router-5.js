
var http=require('http')
var url=require('url')

var G={};
var app=function(req,res){
    // console.log("app");
    var pathname=url.parse(req.url).pathname;
    if (!pathname.endsWith("/")){
        pathname+="/";
    } 
    console.log(pathname);
    if (G[pathname]) {
        G[pathname](req,res);
    }
    else {
        res.end('no router');
    }

}

app.get=function(string,callback){
    if(!string.endsWith("/")){
        string+="/";
    }
    if(!string.startsWith("/")){
        string="/"+string;
    }
    G[string]=callback;
    
}
app.post=function(string,callback){
    G[string]=callback;
}


http.createServer(app).listen(8001);
app.get("login",function(req,res){
    console.log("login");
    res.end("login");
});
app.get("register",function(req,res){
    console.log("register");
    res.end("register");
});


