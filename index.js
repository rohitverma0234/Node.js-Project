const http = require('http');
const fs = require('fs');
const path = require('path')

const Hostname = "localhost";
const Port = 3000;

const Server = http.createServer((req, res) => {
    console.log("requsest for " + req.url + " by method " + req.method)

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == "/") {
            fileUrl = "/index.html"
        } else {
            fileUrl = req.url
        }

        var filePath = path.resolve('./Public' + fileUrl);  // folderName and index.html

        const fileExt = path.extname(filePath)

        if (fileExt == ".html") {
            fs.exists(filePath, (exists) => {     // exists = callback function
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404 ' + fileUrl + ' does not exists. </h1></body></html>')
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res)
            })
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404 ' + fileUrl + ' not a HTML file. </h1></body></html>')
        }

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404 ' + fileUrl + ' not supported. </h1></body></html>')
    }

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1>Server is created successfully :)</h1></body></html>')
})

Server.listen(Port, Hostname, () => {          // Port should be the first argument.
    console.log(`server is runnung in http://${Hostname}:${Port}`)
})
