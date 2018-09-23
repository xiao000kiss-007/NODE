var express = require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var md5 = require('md5-node');
var multiparty=require('multiparty');
var fs=require('fs');
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
app.use('/upload',express.static('upload'));
// app.use(function(req,res,next){
//     if(req.url=='/login'||req.url=='/doLogin'){
//         next();
//     }else{
//         if(req.session.userinfo&&req.session.userinfo.username!=""){
//             app.locals['userinfo']=req.session.userinfo;/*配置全局变量*/
//             next();
//         }else{
//             res.redirect('/login');
//         }
//     }
 
// })
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
app.post("/doProductadd",function(req,res){
    var form = new multiparty.Form();
    form.uploadDir="upload";
    form.parse(req, function(err, fields, files) {
        const title=fields.title[0];
        const price=fields.price[0];
        const fee=fields.fee[0];
        const description=fields.description[0];
        const pic=files.pic[0].path;
        DB.insert('product',
        {
            title:title,
            price:price,
            fee:fee,
            description:description,
            pic:pic
        },
        function(err,data){
            res.redirect('/product');
        })


    });
});
app.get("/productedit",function(req,res){
    // res.send("productedit")
    //获取GET传值
    const id=req.query.id;
    //去数据库中查询ID 注意数据库中ID为ObjectId
    DB.find('product',{"_id":new DB.ObjectId(id)},function(err,data){
        // console.log(data);
        res.render('productedit.ejs',
        {
            list:data[0]
        }
        );
    });
    
});
app.post('/doProductedit',function(req,res){
    const form = new multiparty.Form();
    form.uploadDir="upload";
    form.parse(req, function(err, fields, files) {
        const _id=fields._id[0];
        const title=fields.title[0];
        const price=fields.price[0];
        const fee=fields.fee[0];
        const description=fields.description[0];
        const originalFilename=files.pic[0].originalFilename;
        const pic=files.pic[0].path;
        // console.log(files);
        if(originalFilename){
           var setData={
                title:title,
                price:price,
                fee:fee,
                description:description,
                pic:pic
            }

        }else{
           var setData={
                title:title,
                price:price,
                fee:fee,
                description:description,
            }
            fs.unlink(pic,function(){
                console.log('删除临时文件成功')
            });

        }
        DB.update('product',
        {"_id":new DB.ObjectId(_id)},
        setData,   
        function(err,data){
            res.redirect('/product');
        })



    });
})
app.get('/productdelete',function(req,res){
    const id=req.query.id;
    // console.log(id);
    DB.deleteOne('product',{"_id":new DB.ObjectId(id)},function(err,data){
        if(!err){
            res.redirect('/product');
        }
    })
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