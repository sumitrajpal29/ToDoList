const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

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

  res.render("index",{HEADING:date.day(),NEWiTEMS:items,buttonValue:"default"});
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
