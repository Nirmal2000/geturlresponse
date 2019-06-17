var fs = require("fs")

module.exports.render_html = function(file,res){
    fs.readFile('index1.html', function(err, data) {
        res.setHeader('Content-Type', 'text/html')
        
        if(err){
            return console.error(err)
        }

        res.write(data);
        res.end()
    });
}