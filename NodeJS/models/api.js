var fs = require('fs')
module.exports={
    fun1: function(response){
        response.write('执行函数FUN1');
        console.log('执行函数FUN1');
           },
    fun2: function(response){
        response.write('执行函数FUN2');
        console.log('执行函数FUN2');
          },
    readfile: function (path) {
        fs.readFile(
            path,
            function(err,data){
                if(err){
                    console.log(err);
                }else {
                    console.log(data.toString());
                }
            });
            console.log("异步方法执行完毕");     
        },
    readfileSync: function(path){
            var data=fs.readFileSync(path,'utf-8');
            console.log("同步方法执行完毕");
            return data;
        },
    writefile: function(path,data){ //异步方式
        fs.writeFile(
            path,
            data,
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('文件被保存！');
        })
    },
    writefileSync: function(path,data){
        fs.writeFileSync(path,data);
        console.log("同步写文件完成");  
    },
    readimg: function(path,res){
        fs.readFile(
            path,
            'binary',
            function(err,file){
                if (err) {
                    console.log(err);
                    return;
                }else{
                    console.log("输出文件");
                    res.write(file,'binary');
                    res.end('');
                }
        });
    }            
}