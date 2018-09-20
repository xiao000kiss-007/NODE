var express = require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var md5 = require('md5-node');
const DB=require('./modules/db.js');

var app=new express()
app.set('view engine','ejs');
// 设置session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*30 },
    rolling:true
  }));
app.use(express.static('public'));
app.use(function(req,res,next){
    if(req.url=='/login'||req.url=='/doLogin'){
        next();
    }else{
        if(req.session.userinfo&&req.session.userinfo.username!=""){
            app.locals['userinfo']=req.session.userinfo;/*配置全局变量*/
            next();
        }else{
            res.redirect('/login');
        }
    }
 
})
// 设置bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get("/",function(req,res){
    res.send("index")
});
app.get("/login",function(req,res){
    // res.send("login")
    res.render("login");
});
app.get("/product",function(req,res){
    // res.send("product")
    //连接数据库
    DB.find('product',{},function(err,data){
        res.render('product.ejs',{
            list:data
        });
      
    });
});
app.get("/productadd",function(req,res){
    // res.send("productadd")
    res.render('productadd.ejs');
});
app.get("/productedit",function(req,res){
    // res.send("productedit")
    res.render('productedit.ejs');
});
app.post("/doLogin", function(req,res){
    const username=req.body.username;
    const password=md5(req.body.password);
    console.log(password);
    //连接数据库
    DB.find('user',
    {
        username:username,
        password:password
    },
    function(err,data){
        if(data.length>0){
            console.log('登入成功');
            req.session.userinfo=data[0];
            res.redirect('/product');
        }else{
            console.log('登入失败');
            res.send("<script>alert('登入失败');location.href='/login'</script>");
        }
       
    });
});
app.get('/loginOut',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/login');
    })
});
app.listen(3000,"127.0.0.1");