const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;
const DbUrl = 'mongodb://localhost:27017';
// Database Name
const dbName = 'productmanage';

function __connetDb(callback){
    //连接数据库
    MongoClient.connect(DbUrl,
        { useNewUrlParser: true }, 
        function(err,client){
        if(err){
            console.log("数据库连接失败");
            return;
        }
       callback(client);
    
    });
}
//暴露ObjectId
exports.ObjectId=ObjectId;
//查询数据
exports.find=function(collectionname,json,callback){
        //连接数据库
    __connetDb(function(client){
        const myDb=client.db(dbName);
        const result=myDb.collection(collectionname).find(json);
        result.toArray(function(err,data){
            // console.log(data);
            client.close();//关闭数据库
            callback(err,data);//拿到数据执行回调函数
        });
    })

};
//插入数据
exports.insert=function(collectionname,json,callback){
    //连接数据库
__connetDb(function(client){
    const myDb=client.db(dbName);
    myDb.collection(collectionname).insertOne(json,function(err,data){
        callback(err,data);
    });

})

}
//修改数据
exports.update=function(collectionname,json1,json2,callback){
    //连接数据库
__connetDb(function(client){
    const myDb=client.db(dbName);
    myDb.collection(collectionname).updateOne(json1,{$set:json2},function(err,data){
        callback(err,data);
    });

})

}
//删除数据
exports.deleteOne=function(collectionname,json,callback){
    //连接数据库
__connetDb(function(client){
    const myDb=client.db(dbName);
    myDb.collection(collectionname).deleteOne(json,function(err,data){
        callback(err,data);
    });

})

}
