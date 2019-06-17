var url = require("url")

module.exports.download= function(req,res){           
        var g = url.parse(req.url).query
        arr= g.split('=')
        data = arr[1]
        console.log(data)
        res.end(data)
}