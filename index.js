const http = require('http');
const formidable = require('formidable');
const url = require('url');
const misc = require('./misc');

http.createServer(async function (req, res) {
    //On submit
    if (req.url == '/shorten') {
        var small_url = 1;
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (fields.url != '') {
                //Read in the records
                var records = await misc.functions.read_file('records.json');
                if (records == '') {
                    records = {};
                } else {
                    records = JSON.parse(records);
                }

                //shorten the url
                small_url = await misc.functions.shorten(fields.url, records);
                //update the records.json data
                await misc.functions.write_file('records.json', JSON.stringify(records));

                //redirect to home page with displayed shorten url
                res.writeHead(302, {
                  'Location': '/?url=http://localhost:9000/' + small_url
                });

                res.end();
            }
            res.writeHead(302, {
              'Location': '/'
            });

            res.end();
        });
    //User enters shortened url
    }else if (req.url != '/' && req.url.indexOf('url') < 0) {
        var value = req.url.replace('/', '');
        if(parseInt(value)) {
            var records = await misc.functions.read_file('records.json');
            if (records == '') {
                records = {};
            } else {
                records = JSON.parse(records);
            }
            //find url that correlates with parameter
            redirect_url = await misc.functions.find_url(parseInt(value), records);
            if (redirect_url != 0) {
                res.writeHead(302, {
                  'Location': redirect_url
                });
                res.end(); 
            }
        }
        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
    } else {
        //Build out the form
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