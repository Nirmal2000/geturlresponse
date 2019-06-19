var http=require("http")
var https=require("https")
var url= require("url")
var fs=require("fs")
var path=require('path')
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
    
}).listen(process.env.PORT || 8080);