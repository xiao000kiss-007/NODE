const fs=require('fs')

module.exports={
    getMime:function (extname) {
        switch(extname){
            case '.html':
            return 'text/html';
            case '.css':
            return 'text/css';
            case '.js':
            return 'text/javascript';
            default:
            return 'text/html';
        }
    },
    getMimefromfile:function (extname,callback) {
        fs.readFile("./mime.json",function (err,data) {
            if (err) {
                console.log("文件不存在！");
                return false;
            } else  
            
            var Mimes=JSON.parse(data.toString());
            const myMime=Mimes[extname] ;
            console.log("22222");
            callback(myMime);
        })
    },
    getMimefromfileA:function (extname,EventEmitter) {
        fs.readFile("./mime.json",function (err,data) {
            if (err) {
                console.log("文件不存在！");
                return false;
            } else  
            
            var Mimes=JSON.parse(data.toString());
            const myMime=Mimes[extname] ;
            console.log("22222");
            EventEmitter.emit('getmime',myMime);
        })
    }
}