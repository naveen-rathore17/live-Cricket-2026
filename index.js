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



app.get("/legal", (req, res) => {
  res.render("info");
});

app.get("/squads", (req, res) => {
  res.render("squad");
});

app.get("/watch-live-zeenews", (req, res) => {
  res.render("zeenews", {
    streamNews: process.env.STREAM_NEWS_URL
  })
});

app.get("/star_sport_1", (req, res) => {
  res.render("sport-1")
});

app.get("/live-matches", (req, res) => {
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

app.get("/live_news_channel", (req, res) => {
  res.render("all-news")
})
// All news channnel routes
app.get('/aaj_tak_live', (req, res) => {
  res.render('player', {
    title: "Aaj Tak Live",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/250px-Aaj_Tak_logo.svg.png",
    stream: process.env.AAJ_TAK_STREAM
  });
});

app.get("/zee_news_live", (req, res) => {
  res.render("player", {
    title: "Zee News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Zee_News_2025.svg/250px-Zee_News_2025.svg.png",
    stream: process.env.ZEE_NEWS_STREAM
  });
});

app.get("/abp_news_live", (req, res) => {
  res.render("player", {
    title: "ABP News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ABP_News_logo.svg/120px-ABP_News_logo.svg.png",
    stream: process.env.ABP_NEWS_STREAM
  });
});

app.get("/ndtv_live", (req, res) => {
  res.render("player", {
    title: "NDTV India",
    logo: "https://imgs.search.brave.com/tMaWAXSdfAfhp0uGwr9u9FZ0e-oym9m6TX2Er8ezeOk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL25kdHY5/MTgyLmxvZ293aWsu/Y29tLndlYnA",
    stream: process.env.NDTV_INDIA_STREAM
  });
});

app.get("/india_tv_live", (req, res) => {
  res.render("player", {
    title: "India TV",
    logo: "https://imgs.search.brave.com/4J2KgAMzlZYgp5Be0B8CarBoOaRkWov-JED8DbmafgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC8z/NjctMzY3MDgxOF9p/bmRpYS10di1sb2dv/LXBuZy5wbmc",
    stream: process.env.INDIA_TV_STREAM
  });
});

app.get("/news18_live", (req, res) => {
  res.render("player", {
    title: "News 18 India",
    logo: "https://imgs.search.brave.com/EjwanQdFsOvV0FjIfn3AxNm0HZvE9ojhTb09kQ70Plc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVkaWFpbmZvbGlu/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDQvTmV3/czE4LUluZGlhLWxv/Z28uanBn",
    stream: process.env.NEWS18_INDIA_STREAM
  });
});

app.get("/republic_live", (req, res) => {
  res.render("player", {
    title: "Republic Bharat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Republic_Bharat_logo.svg/250px-Republic_Bharat_logo.svg.png",
    stream: process.env.REPUBLIC_BHARAT_STREAM
  });
});

app.get("/times_now_live", (req, res) => {
  res.render("player", {
    title: "Times Now Navbharat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Times_Now_Navbharat.svg/250px-Times_Now_Navbharat.svg.png",
    stream: process.env.TIMES_NOW_NAVBHARAT_STREAM
  });
});

app.get("/dd_news_live", (req, res) => {
  res.render("player", {
    title: "DD News",
    logo: "https://imgs.search.brave.com/LRjRrVDEdplVbuQBcQsp-0uJ8fdcOE3eHbBT5uVZv8Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4uYnJhbmRmZXRjaC5pby9pZEdPNzJ2a3FkL3cvNDAwL2gvNDAwL3RoZW1lL2RhcmsvaWNvbi5qcGVn",
    stream: process.env.DD_NEWS_STREAM
  });
});

app.get("/india_today_live", (req, res) => {
  res.render("player", {
    title: "India Today",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/India_Today_logo.png",
    stream: process.env.INDIA_TODAY_STREAM
  });
});

app.get("/tv9_live", (req, res) => {
  res.render("player", {
    title: "TV9 Bharatvarsh",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/TV9_Bharatvarsh.svg/250px-TV9_Bharatvarsh.svg.png",
    stream: process.env.TV9_BHARATVARSH_STREAM
  });
});

app.get("/news_nation_live", (req, res) => {
  res.render("player", {
    title: "News Nation",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/News_nation_logo.jpg/250px-News_nation_logo.jpg",
    stream: process.env.NEWS_NATION_STREAM
  });
});

app.get("/zee_bharat_live", (req, res) => {
  res.render("player", {
    title: "Zee Bharat",
    logo: "https://imgs.search.brave.com/KreAPHOcV5bwpQRPww2o_XyhWRvSv65we6R1Kebr7ZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG1pbi56ZWVtZWRpYS5pbi9zdG9yYWdlL2xvZ28vemVlLWJoYXJh/dC1oaS5zdmc",
    stream: process.env.ZEE_BHARAT_STREAM
  });
});

app.get("/zee_business_live", (req, res) => {
  res.render("player", {
    title: "Zee Business",
    logo: "https://imgs.search.brave.com/7T4hNXwR_ZP_vEG0OAQjwlKzaxEUwEtMvmaZyeuwthU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0aWMud2lraWEubm9jY29va2llLm5ldC9sb2dvcGVkaWEvaW1hZ2VzLzAvMDcvWmVlX0J1c2luZXNzXygyMDI1KS5zdmc",
    stream: process.env.ZEE_BUSINESS_STREAM
  });
});

app.get("/zee_rj_live", (req, res) => {
  res.render("player", {
    title: "Zee Rajasthan",
    logo: "https://imgs.search.brave.com/esBlQzJ4Q_dqM8P07jmA-yTRRGcAoZRt5uaHvjs3x9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG1pbi56ZWVtZWRpYS5pbi9zdG9yYWdlL2xvZ28vemVlLXJhamFzdGhhbi5zdmc",
    stream: process.env.ZEE_RAJASTHAN_STREAM
  });
});

app.get("/dd_sports_live", (req, res) => {
  res.render("player", {
    title: "DD Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/DD_Sports_logo.svg/250px-DD_Sports_logo.svg.png",
    stream: process.env.DD_SPORTS_STREAM
  });
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});