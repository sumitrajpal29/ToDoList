const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.set("view engine","ejs");

var items = [];
var works = [];

app.listen(3000,function(){
  console.log("App is running on port 3000");
})

app.get("/",function(req,res){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var date = new Date();
  var dateString = date.toLocaleString("en-US",options)
  console.log(date);
  res.render("index",{HEADING:dateString,NEWiTEMS:items,buttonValue:"default"});
})
app.post("/",function(request,responce){
  var newItem = request.body.NEWiTEMS;
  console.log(request.body.button);
  if(request.body.button=="workButton"){
  works.push(newItem);
  responce.redirect("/work");
  }
  else{
  items.push(newItem);
  responce.redirect("/");
  }
})

app.get("/work",function(req,res){
  res.render("index",{HEADING:"Work List",NEWiTEMS:works,buttonValue:"workButton"});
})
