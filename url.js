var url = require("url")
var http = require("http")
var https = require("https")
module.exports.parse_get = function(req,res){
    var g = url.parse(req.url).query
                arr= g.split('=')
                data = arr[1]
                
                try{                    
                    url_object = new URL(arr[1])                    
                    protocol = ret_proto(url_object.protocol)                    
                    protocol.get(data,function(re){
                        console.log(re.statusCode)
                        res.end(data+'-'+re.statusCode)
                    }).on('error',function(err){
                        res.end(this.statusCode)
                    })
                }
                catch(err){
                    
                    if(err == 1){
                        res.end("INVALID PROTOCOL")
                        return
                    }

                    http.get("http://"+data,function(re){
                        res.end(data+'-'+re.statusCode)
                    }).on('error',function(err){
                        res.end(this.statusCode)
                    })
                }
}
function ret_proto(proto){
    if(proto == 'https:'){
        return https
    }
    else if(proto == 'http:'){
        return http
    }
    else{
        throw 1
    }
}