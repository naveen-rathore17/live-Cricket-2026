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

app.get("/star_sport_2", (req, res) => {
  res.render("sport-2", {
    streamUrl: process.env.STREAM_URL
  });
});

app.get("/legal", (req, res) => {
  res.render("info");
});

app.get("/squads", (req, res) => {
  res.render("squad");
});

app.get("/watch-live-zeenews", (req, res) => {
  res.render("zeenews",{
    streamNews: process.env.STREAM_NEWS_URL
  })
});

app.get("/star_sport_1", (req, res) => {
  res.render("sport-1",{
    sport1: process.env.SPORT_1
  })
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

app.get("/live_news_channel",(req,res)=>{
  res.render("all-news")
})
 // All news channnel routes
app.get('/aaj_tak_live', (req, res) => {
  res.render('player', {
    title: "Aaj Tak Live",
    logo:"https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aaj_Tak_logo.svg/250px-Aaj_Tak_logo.svg.png",
    stream: "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8"
  });
});

app.get("/zee_news_live", (req, res) => {
  res.render("player", {
    title: "Zee News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Zee_News_2025.svg/250px-Zee_News_2025.svg.png",
    stream: "https://dknttpxmr0dwf.cloudfront.net/index_57.m3u8",
  });
});

app.get("/abp_news_live", (req, res) => {
  res.render("player", {
    title: "ABP News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ABP_News_logo.svg/120px-ABP_News_logo.svg.png",
    stream: "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/abpnews-livetv/master.m3u8",
  });
});
app.get("/ndtv_live", (req, res) => {
  res.render("player", {
    title: "NDTV India",
    logo: "https://imgs.search.brave.com/tMaWAXSdfAfhp0uGwr9u9FZ0e-oym9m6TX2Er8ezeOk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL25kdHY5/MTgyLmxvZ293aWsu/Y29tLndlYnA",
    stream: "https://ndtvindiaelemarchana.akamaized.net/hls/live/2003679/ndtvindia/master.m3u8",
  
  });
});

app.get("/india_tv_live", (req, res) => {
  res.render("player", {
    title: "India TV",
    logo: "https://imgs.search.brave.com/4J2KgAMzlZYgp5Be0B8CarBoOaRkWov-JED8DbmafgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC8z/NjctMzY3MDgxOF9p/bmRpYS10di1sb2dv/LXBuZy5wbmc",
    stream: "https://pl-indiatvnews.akamaized.net/out/v1/db79179b608641ceaa5a4d0dd0dca8da/index.m3u8",
  
  });
});

app.get("/news18_live", (req, res) => {
  res.render("player", {
    title: "News 18 India",
    logo: "https://imgs.search.brave.com/EjwanQdFsOvV0FjIfn3AxNm0HZvE9ojhTb09kQ70Plc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVkaWFpbmZvbGlu/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDQvTmV3/czE4LUluZGlhLWxv/Z28uanBn",
    stream: "https://n18syndication.akamaized.net/bpk-tv/News18_India_NW18_MOB/output01/master.m3u8",
  
  });
});

app.get("/republic_live", (req, res) => {
  res.render("player", {
    title: "Republic Bharat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Republic_Bharat_logo.svg/250px-Republic_Bharat_logo.svg.png",
    stream: "https://vg-republictvlive.akamaized.net/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-275673/main.m3u8",
  
  });
});

app.get("/times_now_live", (req, res) => {
  res.render("player", {
    title: "Times Now Navbharat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Times_Now_Navbharat.svg/250px-Times_Now_Navbharat.svg.png",
    stream: "https://amg01448-samsungin-tinnavbharat-samsungin-ad-m8.amagi.tv/playlist/amg01448-samsungin-tinnavbharat-samsungin/playlist.m3u8",
  
  });
});

app.get("/dd_news_live", (req, res) => {
  res.render("player", {
    title: "DD News",
    logo: "https://imgs.search.brave.com/LRjRrVDEdplVbuQBcQsp-0uJ8fdcOE3eHbBT5uVZv8Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZEdPNzJ2a3Fk/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc2NDg3MzU2NTgx/MA",
    stream: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/0811cd8c37ca4c409d5385a6cd2fa18b/index.m3u8",
  
  });
});



app.get("/india_today_live", (req, res) => {
  res.render("player", {
    title: "India Today",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/India_Today_logo.png",
    stream: "https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatodaylive/playlist.m3u8",
  
  });
});

app.get("/tv9_live", (req, res) => {
  res.render("player", {
    title: "TV9 Bharatvarsh",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/TV9_Bharatvarsh.svg/250px-TV9_Bharatvarsh.svg.png",
    stream: "https://dyjmyiv3bp2ez.cloudfront.net/pub-iotv9hinjzgtpe/liveabr/playlist.m3u8",
  
  });
});

app.get("/news_nation_live", (req, res) => {
  res.render("player", {
    title: "News Nation",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/News_nation_logo.jpg/250px-News_nation_logo.jpg",
    stream: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/6cd2f649739a45ca9de1daf81cc7d0f2/index.m3u8",
  
  });
});


app.get("/zee_bharat_live", (req, res) => {
  res.render("player", {
    title: "Zee Bharat",
    logo: "https://imgs.search.brave.com/KreAPHOcV5bwpQRPww2o_XyhWRvSv65we6R1Kebr7ZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG1p/bi56ZWVtZWRpYS5p/bi9zdG9yYWdlL2xv/Z28vemVlLWJoYXJh/dC1oaS5zdmc",
    stream: "https://vg-zeefta.akamaized.net/ptnr-yupptv/title-zeehindustan/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/96bbab12-582e-4540-af70-510ab6824581/main.m3u8",
  
  });
});

app.get("/zee_business_live", (req, res) => {
  res.render("player", {
    title: "Zee Business",
    logo: "https://imgs.search.brave.com/7T4hNXwR_ZP_vEG0OAQjwlKzaxEUwEtMvmaZyeuwthU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2xv/Z29wZWRpYS9pbWFn/ZXMvMC8wNy9aZWVf/QnVzaW5lc3NfKDIw/MjUpLnN2Zy9yZXZp/c2lvbi9sYXRlc3Qv/c2NhbGUtdG8td2lk/dGgtZG93bi8yNTA_/Y2I9MjAyNTA2MDkx/NDA4MTA",
    stream: "https://dwby15d04agvq.cloudfront.net/index_5.m3u8",
  
  });
});


app.get("/zee_rj_live", (req, res) => {
  res.render("player", {
    title: "Zee Rajasthan",
    logo: "https://imgs.search.brave.com/esBlQzJ4Q_dqM8P07jmA-yTRRGcAoZRt5uaHvjs3x9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG1p/bi56ZWVtZWRpYS5p/bi9zdG9yYWdlL2xv/Z28vemVlLXJhamFz/dGhhbi5zdmc",
    stream: "https://vg-zeefta.akamaized.net/ptnr-yupptv/title-zeerajashthannews/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/8e864b9a-1681-41a0-99a6-387490bc5b24/main.m3u8",
  
  });
});


app.get("/dd_sports_live", (req, res) => {
  res.render("player", {
    title: "DD Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/DD_Sports_logo.svg/250px-DD_Sports_logo.svg.png",
    stream: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8",
  
  });
});



















// http://103.99.249.139/zeecinema/index.m3u8  zee cinema




const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});