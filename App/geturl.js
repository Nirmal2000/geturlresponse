var http = require("http")
var fs = require("fs")
var url = require("url")
var path = require("path")
var https = require("https")
var resdata

var geturl
http.createServer(function(req,res){
    
    var a = url.parse(req.url,true)
    console.log("=======<>",a)
    console.log(a.query)
    if(a.pathname=='/file.txt'){
    
    if(!resdata){
        res.writeHead(200,{"Content-type":'text/html'})
        res.end(`<p>Get Response FIRST</p>`)
    }
    else{
        res.writeHead(200,{"Content-type":'txt/plain'})
        res.end(`-  ${resdata}`)
    }
    res.end()
    }
    else{

        res.writeHead(200,{"Content-type":"text/html"})
        res.write(`
        <form method="GeT" action="/response" >
        <input type="url" name="url" id="url">
        <input type="submit" value="Get response">
        </form>
        
        <form method="POST" action="/file.txt">
        <input type="submit" value="File">
        </form>`)
        
        //console.log("====>",a)
        geturl=a.query.url
        
        if(geturl!=undefined)
        {   
            var b = path.dirname(geturl)
            var c = path.basename(geturl)
            
        }
        https.get(geturl,function(re){
            resdata=re.statusCode
            res.end(`<p>${re.statusCode}</p>`)
            
            // re.on('data',function(data){
            //     //console.log("==>",JSON.parse(data))
            //     resdata=JSON.parse(data)
            //     res.write(`<p>${data}</p>`,function(e){
            //         if(e){
            //             return e
            //         }
            //         res.end()
                    
            //     })

            // })
            // re.on('error',function(err){
            
            // })
        }).on("error",function(err){
            if(a.pathname=='/'){
                res.end(`<p>enter a url</p>`)
            }
            else{
                res.end(`<p>Invalid Url</p>`)
            }
            
        })

    }
    
}).listen(8080)

