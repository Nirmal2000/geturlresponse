var http=require("http")
var url= require("url")
var fs=require("fs")
var index_route = require('./index.js')
var file_route = require('./file.js')
var url_route = require('./url.js')


http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','https://github.com')
    path_name = url.parse(req.url).pathname
    
    switch(path_name){

        case '/':
            index_route.render_html('index.html',res)
            break

        case '/file':
                file_route.download(req,res)
                break

        case '/url':                
                url_route.parse_get(req,res)
                break

    }

    if(path_name.endsWith('.js')){
        fs.readFile(path_name.substring(1), function(err, data) {
            stat = fs.statSync(path_name.substring(1))
            res.setHeader('Last-Modified',stat.mtime)
            res.setHeader('Content-Type', 'text/javascript')
            
            if(err){
                return console.error(err)
            }            
            res.write(data);
            res.end()
        });

    }
    else if(path_name.endsWith('.png')){
        fs.readFile(path_name.substring(1), function(err, data) {
            res.setHeader('Content-Type', 'image/png')
            
            if(err){
                return console.error(err)
            }            
            res.write(data);
            res.end()
        });
    }
    
}).listen(process.env.PORT || 8000);