var http=require("http")
var https=require("https")
var url= require("url")
var fs=require("fs")
var path=require('path')



http.createServer(function (req, res) {
    console.log(url.parse(req.url))
    
    getu = url.parse(req.url).pathname
    if(getu=='/')
    fs.readFile('index1.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(err){
            return console.error(err)
        }

        res.write(data);
        res.end()
    });
    
    //console.log("==>",getu)   
    //console.log(getu=='/file.txt')
    if(getu=='/file'){
        res.writeHead(200, {'Content-Type': 'txt/plain'})
        var g = url.parse(req.url).query
        arr= g.split('=')
        data = arr[1]
        console.log(data)
        res.end(data)

        //console.log(g.f)
    }
    else if(getu != '/' && getu !='/favicon.ico'){
        //var finurl = getu.slice(1,getu.length)
        var g = url.parse(req.url).query
        arr= g.split('=')
        data = arr[1]
        console.log(data)
        var rhttp= /^(http)(:)(\/)(\/)/i
        var rhttps = /^(https)(:)(\/)(\/)/i
        var proto = /^(\w)+(:)(\/)(\/)/i
        if(rhttp.exec(data)){
            http.get(data,function(re){
                res.end(data+' - '+re.statusCode)
    
            }).on('error',function(err){
                res.end(this.statusCode)
            })
        }
        else if(rhttps.exec(data)){
            https.get(data,function(re){
                res.end(data+'-'+re.statusCode)
    
            }).on('error',function(err){
                res.end(this.statusCode)
            })
        }
        else if(proto.exec(data)){
            res.end("INVALID PROTOCOL")
        }
        else{
            data='http://'+data
            http.get(data,function(re){
                res.end(data+'-'+re.statusCode)
    
            }).on('error',function(err){
                res.end(this.statusCode)
            })
        }
        
        
        // 
        // res.en   d("ER")
    }

  }).listen(8080);