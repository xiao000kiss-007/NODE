var express = require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const DbUrl = 'mongodb://localhost:27017';
// Database Name
const dbName = 'productmanage';

var app=new express()
app.set('view engine','ejs');
app.use(express.static('public'));
// 设置bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(3000,"127.0.0.1");
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
                res.redirect('/product');
            }else{
                console.log('登入失败');
                res.send("<script>alert('登入失败');location.href='/login'</script>");
            }
            client.close();
        })
    })
})