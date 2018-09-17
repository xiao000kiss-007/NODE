var http= require('http')
var ejs= require('ejs')
var app= require('./model/route-express.js')
// console.log(app);

http.createServer(app).listen(8001);
app.get("/",function(req,res){
    // console.log("login");
    var msg='这是数据库的数据'
    ejs.renderFile("views/index.ejs",
    {msg:msg},
    function(err,data){
        res.send(data);
    });
});
app.get("login",function(req,res){
    // console.log("login");
    ejs.renderFile("views/form.ejs",
    {},
    function(err,data){
        res.send(data);
    });
});
app.get("register",function(req,res){
    console.log("register");
    res.send("register");
});
app.post("dologin",function(req,res){
    console.log(req.body);
    res.send("<script>alert('登入成功');history.back()</script>");
});
app.get('/news',function(req,res){
    console.log("news");
    res.send("新闻数据");
})

