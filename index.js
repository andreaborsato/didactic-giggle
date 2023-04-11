const path = require('path');
var express = require('express');
var app = express();
const http = require('http');
const socketIO= require('socket.io');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 3000;

let server = http.createServer(app)
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});




io.on("connection", (socket)=>{
    console.log(`New user: ${socket.id} just connected`);
    ///////////////////////////////

    //////////////////////////////
    socket.on("disconnect", function() {
        console.log(`user: ${socket.id} has just disconnected from server`);
      })
});


