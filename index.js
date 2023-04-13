const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const http = createServer(app);

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + `/public/index.html`);
});

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    transports: ["websocket"],
  },
  allowEIO3: true,
});

let port = process.env.PORT || 3001;

http.listen(port, () =>
  console.log("RUNNING SERVER ON http://localhost:" + port)
);


io.on("connection", (socket) => {
  
  console.log(`New user: ${socket.id} just connected`);
  ///////////////////////////////
  socket.emit("userId", `${socket.id}`);
  
 

  socket.on('move', function(data){
    console.log(data);
    console.log(data.id);
    socket.broadcast.emit('moveUpdate', {
      data: data
      
    })
    
    
    
  })

  //////////////////////////////
  socket.on("disconnect", function (user) {
  
   
    
    console.log(`user: ${socket.id} has just disconnected from server`);
    
  });
})
