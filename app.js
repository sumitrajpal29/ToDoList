const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true ,useUnifiedTopology:true});

const itemsSchema={
  name:String
};

const Item = mongoose.model("Item",itemsSchema);

const vegetables = new Item({name:"Tinda"});
const fruits = new Item({name:"Apple"});

const itemsArray=[vegetables,fruits];

Item.insertMany(itemsArray,function(err){
  if(err)console.log(err);
  else console.log("Successfully saved items to DB.");
});

// app.listen(3000,function(){
//
//   console.log("App is running on port 3000");
// })

app.get("/",function(req,res){

  res.render("index",{HEADING:"Today",NEWiTEMS:items,buttonValue:"default"});
})
app.post("/",function(request,responce){
  const newItem = request.body.NEWiTEMS;
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
