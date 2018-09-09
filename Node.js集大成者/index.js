var http = require('http');

http.createServer(function (request, response) {
 
 /*当请求url为http://127.0.0.1:8888/json则返回一个json对象，其他url时则返回一个字符串：*/
    if(request.url == "/json"){
        response.writeHead(200, {'Content-Type': 'application/json'});
        var data = {
            "name":"nodejs",
            "value":"stone"
        };
        response.end(JSON.stringify(data));
    }else{
        response.writeHead(200, {'Content-Type': 'text/plain'});
 
        response.end('Hello World\n');
    }
	
}).listen(8888);
 
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

