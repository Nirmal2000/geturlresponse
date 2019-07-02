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
    console.log(path_name)
    console.log(path_name.endsWith('.js'))
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
        // case '/cachereq.js':
        //         fs.readFile('cachereq.js', function(err, data) {
        //             res.setHeader('Content-Type', 'text/javascript')
                    
        //             if(err){
        //                 return console.error(err)
        //             }            
        //             res.write(data);
        //             res.end()
        //         });
        //         break
        // case '/g.png':
        //         fs.readFile('g.png', function(err, data) {
        //             res.setHeader('Content-Type', 'image/png')                    
        //             if(err){
        //                 return console.error(err)
        //             }            
        //             res.write(data);
        //             res.end()
        //         });
        

                    

    }
    console.log("==>",path_name.substring(1))
    if(path_name.endsWith('.js')){
        fs.readFile(path_name.substring(1), function(err, data) {
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
    
}).listen(process.env.PORT || 8080);