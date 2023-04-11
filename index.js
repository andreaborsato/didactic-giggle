const path = require("path");
var express = require("express");
var app = express();
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "./public");
const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);
let socketUsers = {};
var users = [];

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

io.on("connection", (socket) => {
  
  console.log(`New user: ${socket.id} just connected`);
  ///////////////////////////////
  socket.emit("userId", `${socket.id}`);
  
  socket.on("adduser", (user)=>{
      users[user]= socket.user;
    
    
  })

  socket.on('mouseActivity', function(data){
    console.log(data);
    socket.broadcast.emit('allMouseActivity', {session_id: socket.id, coords: data})
    
  })

  //////////////////////////////
  socket.on("disconnect", function (user) {
  
      delete users[user];
      
    socket.emit('update', user)
   
    
    console.log(`user: ${socket.id} has just disconnected from server`);
    
  });
  
  socket.on('update', function(user){
    users[user] = user
  })
});
