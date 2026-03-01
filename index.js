const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/help", (req, res) => {
  res.render("help");
});
app.get("/watch-live", (req, res) => {
  res.redirect("https://modderguy-star-sports-2hd-hindi.pages.dev/");
});
app.get('/legal',(req,res)=>{
  res.render('info')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
