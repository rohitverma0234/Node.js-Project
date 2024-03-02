const http = require('http');

const Hostname = "localhost";
const Port = 3000;

const Server = http.createServer((req,res)=>{
    console.log(req.headers)

    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Server is created successfully :)</h1></body></html>')
})

Server.listen(Port , Hostname, ()=>{          // Port should be the first argument.
    console.log(`server is runnung in http://${Hostname}:${Port}`)
})
