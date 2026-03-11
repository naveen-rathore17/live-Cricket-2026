const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.set("view engine", "ejs");

// Live Users Counter
let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  // console.log("User Connected:", onlineUsers);

  io.emit("updateUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    // console.log("User Disconnected:", onlineUsers);

    io.emit("updateUsers", onlineUsers);
  });
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/watch-live", (req, res) => {
  // res.redirect("https://modderguy-star-sports-2hd-hindi.pages.dev/");
  res.render("live")
});

app.get("/legal", (req, res) => {
  res.render("info");
});

app.get("/squads", (req, res) => {
  res.render("squad");
});
app.get("/watch-live-zeenews",(req,res)=>{
  res.render("zeenews")
})

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});