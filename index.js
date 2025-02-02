// http
const http = require("http");
const app = require("./src/config/express.config")

// server
const httpServer = http.createServer(app);

// host
// 0 - 1024  => well known ports
// ~45000 => reserved ports
// 65535 = 2^16 - 1  => non-reserved ports(open ports)
httpServer.listen(9005,'127.0.0.1', (err) =>{
    if(!err){
        console.log("Server is running on port", 9005);
        console.log("Press CTRL + C to disconnect server...")
    } 
});