var ejs=require('ejs')
var fs=require('fs')

var app={
    login:function (req,res) {
        ejs.renderFile("./views/form.ejs",
        {},
        function(err,data){
            res.end(data);
        });
    },
    register:function(req,res){
        res.write("register");
    },
    home:function(req,res){
        res.write("home");
    },
    dologin:function (req,res) {
        postStr="";
        req.on("data",function(chunk){
            postStr+=chunk;
        });
        req.on("end",function(){
            console.log(postStr);
            fs.appendFile("./login.txt",postStr+"\n",function(err,data){
                if(err){
                    console.log(err);
                    return;
                }
                res.end("<script>alert('登入成功');history.back()</script>");
            })
            
        });
    },   
}
module.exports=app;
