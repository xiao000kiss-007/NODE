var fs=require('fs');
var path=require('path');
var url=require('url');

function getMimefromfile(extname,callback) {
    fs.readFile("./mime.json",function (err,data) {
        if (err) {
            console.log("文件不存在！");
            return false;
        } else  
        
        var Mimes=JSON.parse(data.toString());
        var myMime=Mimes[extname] ;
        callback(myMime);
    })
};

exports.statics=function(req,res,staticpath){
    var pathname=url.parse(req.url).pathname;
    // console.log(pathname);
    if(pathname=="/"){
        pathname="/index.html";
    }
    const extname=path.extname(pathname);
    if(pathname!="/favicon.ico"){
        // console.log(extname);
        fs.readFile(staticpath+'/'+pathname,function (err,result) {
            if (err) {
                console.log("404");
                fs.readFile("static/404.html",function (err,data404) {
                    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    res.write(data404);
                    res.end();
                });
            }else{
               getMimefromfile(extname,function(mime){
                        // console.log(mime);
                        res.writeHead(200,{"Content-Type":""+mime+";charset=utf-8"});
                        res.write(result);
                        res.end();
                });
            

            }
          
        });
        
    }
}
