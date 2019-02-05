const http = require('http');
const formidable = require('formidable');
const url = require('url');
const misc = require('./misc');

http.createServer(async function (req, res) {
    if (req.url == '/shorten') {
        var small_url = 1;
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (fields.url != '') {
                var records = await misc.functions.read_file();
                if (records == '') {
                    records = {};
                } else {
                    records = JSON.parse(records);
                }

                small_url = await misc.functions.shorten(fields.url, records);
                await misc.functions.write_file(JSON.stringify(records));
                res.writeHead(302, {
                  'Location': '/?url=http://localhost:9000/' + small_url
                });
                res.end();
            }
        });
    }else if (req.url != '/' && req.url.indexOf('url') < 0) {
        var value = req.url.replace('/', '');
        if(parseInt(value)) {
            var records = await misc.functions.read_file();
            if (records == '') {
                records = {};
            } else {
                records = JSON.parse(records);
            }
            redirect_url = await misc.functions.find_url(parseInt(value), records);
            if(redirect_url != 1){
                res.writeHead(302, {
                  'Location': redirect_url
                });
                res.end(); 
            }
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="shorten" method="post">');
        res.write('<input type="text" name="url"><br>');
        res.write('<input type="submit">');
        res.write('</form>');

        address = url.parse(req.url, true);
        params = address.query;
        
        if('url' in params) {
            res.write('<div>Short URL: ' + params.url + '</div>');
        }

        return res.end();
    }
}).listen(9000, () => {
    console.log("Server listening on port 9000");
});