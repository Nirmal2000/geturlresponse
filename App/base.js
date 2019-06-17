var url = require('url')

exports.render_html = function(){
    var g = url.parse(req.url).query
                arr= g.split('=')
                data = arr[1]
                return console.log(data)
    
}