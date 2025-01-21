// http
const http = require("http");

// server
const httpServer = http.createServer((req, res) =>{
    // req is always incoming
    // res to send the response to api call
    res.end("Hello world")
});

// host
// 0 - 1024  => well known ports
// ~45000 => reserved ports
// 65535 = 2^16 - 1  => non-reserved ports(open ports)
httpServer.listen(9005,'127.0.0.1', (err) =>{
    if(!err){
        console.log("Server is running on", 9005);
        console.log("Press CTRL + C to disconnect server...")
    } 
});