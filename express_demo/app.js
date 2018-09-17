var express = require('express');
var ejs=require('ejs');

var app=new express()
app.set('view engine','ejs');
app.use(express.static('public'));

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