var express = require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session')
const MongoClient = require('mongodb').MongoClient;
const DbUrl = 'mongodb://localhost:27017';
// Database Name
const dbName = 'productmanage';

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
    res.render('product.ejs');
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
    console.log(req.body);
    MongoClient.connect(DbUrl,
        { useNewUrlParser: true }, 
        function(err,client){
        if(err){
            console.log(err);
            return;
        }
        const myDb=client.db(dbName);
        const result=myDb.collection('user').find(req.body);
        result.toArray(function(err,data){
            console.log(data);
            if(data.length>0){
                console.log('登入成功');
                req.session.userinfo=data[0];
                res.redirect('/product');
            }else{
                console.log('登入失败');
                res.send("<script>alert('登入失败');location.href='/login'</script>");
            }
            client.close();
        })
    })
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