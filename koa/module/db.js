//Db库
const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');

class Db{
    static getInstance(){   /**单例 解决多次实例不共享问题*/
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    constructor(){
        this.dbClient='';/**属性 放DB对象 */
        this.connect(); /**实例化时就连接数据库 */
    }
    connect(){  /** 连接数据库 */
        let _that=this;
        return new Promise((resolve,reject)=>{
            if(!_that.dbClient){  /**解决数据库多次连接问题 */
                MongoClient.connect(Config.dbUrl,
                    { useNewUrlParser: true },
                    (err,client)=>{
                    if(err){
                        reject(err)
                    }else{
                        _that.dbClientdb=client.db(Config.dbName);
                        resolve(_that.dbClientdb)
                    }
                })
            }else{
                resolve(_that.dbClientdb)
            }
        })
    }
    find(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                let result=db.collection(collectionName).find(json);
                result.toArray((err,docs)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(docs)
                    }
                })
            })
        })
    }
    insert(collectionName,json){   
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,(err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }
    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(json1,
                    {$set:json2},
                    (err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    } 
                })
            })
        })
    }
remove(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(json,(err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })          
            })
        })
    }
}

module.exports=Db.getInstance();

