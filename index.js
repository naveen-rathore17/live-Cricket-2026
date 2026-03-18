require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')

// DB connection
require("./DB/connection.js");

// Model import
const Contact = require("./DB/ContactModel.js");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// Live Users Counter
let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;

  io.emit("updateUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
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
  res.render("live");
});

app.get("/legal", (req, res) => {
  res.render("info");
});

app.get("/squads", (req, res) => {
  res.render("squad");
});

app.get("/watch-live-zeenews", (req, res) => {
  res.render("zeenews");
});

app.get("/live-matches",(req,res)=>{
  res.render("liveNotice")
})

// Contact Page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Form Submit
app.post("/contact", async (req, res) => {
  const { name, email, problem } = req.body;

  try {
    await Contact.create({
      name,
      email,
      problem,
    });

    console.log("Data Saved");

    res.render("issue-succ");
  } catch (err) {
    console.log(err);
    res.send("Error Saving Data");
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});