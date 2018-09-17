var http= require('http');
var ejs= require('ejs');
var MongoClient=require('mongodb').MongoClient;
var app= require('./model/route-express.js');

const DBurl="mongodb://localhost:27017/";
var dbName="itying";
// console.log(app);

http.createServer(app).listen(8001);
app.get("/",function(req,res){
    // console.log("login");
    MongoClient.connect(DBurl,{ useNewUrlParser: true },function(err,client){
            if(err){
                throw err;
            }
        const odb=client.db(dbName);
        var list=[];
        var result= odb.collection("user").find({});
        result.each(function(err,doc){
            if(err){
                console.log(err);
            }else{
                if (doc!=null) {
                    list.push(doc);
                }else{
                    // console.log(list);
                    ejs.renderFile("views/index.ejs",
                    {list:list},
                    function(err,data){
                        res.send(data);
                        // client.close();
                    });
                }
            } 
        });

    
    }); 
});


app.get("add",function(req,res){
    MongoClient.connect(DBurl,function(err,client){
        if(err){
            throw err;
        }
        const odb=client.db(dbName);
        var myobj={"name":"kiss","url":"www.hscaiwu.com"};
        odb.collection("user").insertOne(myobj,function (err,result) {
            if(err) throw err;
            console.log("文档插入成功");
           client.close();
           res.send("插入数据成功！");
        })

    })
})