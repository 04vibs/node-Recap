const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.urll === '/'){
        res.write('Hello world');
        res.end();
    }
});

server.on('connection',(socket)=>{
    console.log('New connection');
})
server.listen(3000);
console.log("Listening on port 3000..")