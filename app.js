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

Item.find({},function(err,list){
if (list.length===0) {
  Item.insertMany(itemsArray,function(err){
    if(err)console.log(err);
    else console.log("Successfully saved items to DB.");
  })
}
});

  app.get("/",function(req,res){
    Item.find({},function(err,results){
      if(err)console.log(err);
    res.render("index",{HEADING:"Today",NEWiTEMS:results,buttonValue:"default"});
  })
});

app.listen(3000,function(){
  console.log("App is running at port 3000")
});

app.post("/",function(request,responce){
  const nextItem = request.body.NEWiTEMS;
  console.log(request.body.button);
    const newItem = new Item({name:nextItem});
    newItem.save();
    console.log(nextItem);
    responce.redirect("/");
})

app.get("/work",function(req,res){
  res.render("index",{HEADING:"Work List",NEWiTEMS:works,buttonValue:"workButton"});
})
