const http = require('http');
const https = require('https');
const serverList = require('./serversList.js');

var server = http.createServer(function(request, response){
    var bodyRequest = '';
    
    request.on('data', function(chunk){
            bodyRequest += chunk;
    });
    
    request.on('end', function(){
        serverList.forEach(function(element) {
            var options = {
                'host': element.url,
                'port': 443,
                'path': request.url,
                'method': request.method,
                'headers': {
                    'Content-Type': 'application/json'
                }
            };        
            var req = https.request(options, function(res){
                var data = '';

                res.on('data', function(chunk){
                    data += chunk;
                });
                res.on('end', function(){
                    var send = {'server': element.name, 'data': JSON.parse(data)};
                    response.end(JSON.stringify(send, null, '\t')); 
                });   
                res.on('error', function(err){
                    console.log(err);
                });
            });
            
            req.on('error', function(err){
                console.log(err);
            })
            if(request.method !== 'GET'){
                req.write(bodyRequest);
            }
            req.end();
        });
    })  
});

server.listen(3000);

