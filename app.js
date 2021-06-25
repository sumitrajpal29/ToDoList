const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true ,useUnifiedTopology:true});

const itemsSchema = {
  name:String
};
const listSchema = {
  name:String,
  item:[itemsSchema]
};

const Item = mongoose.model("Item",itemsSchema);
const List = mongoose.model("List",listSchema);

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

app.listen(3000,function(){
  console.log("App is running at port 3000")
});

  app.get("/",function(req,res){
    Item.find({},function(err,results){
      if(err)console.log(err);
    res.render("index",{HEADING:"Today",NEWiTEMS:results,buttonValue:"default"});
  })
});

app.post("/",function(request,responce){
  const nextItem = request.body.NEWiTEMS;
  console.log(request.body.button);
    const newItem = new Item({name:nextItem});
    newItem.save();
    console.log(nextItem);
    responce.redirect("/");
});

app.post("/delete",function(req,res){
  checkedItemId = req.body.CheckBox;
  Item.findByIdAndRemove(checkedItemId,function(err,success){
    if(err)console.log(err);
    else console.log(checkedItemId+" deleted successfully");
    res.redirect("/");
  });
});

app.get("/:parameter",function(req,res){
  const parameter = req.params.parameter;
  console.log("Parameter:"+parameter);
  List.findOne({name:parameter},function(err,list){ //cannot use List.find() here because it returns array of found elements.
    if(!err){
      if(!list){
        console.log("Not found! But added new "+parameter+" list.");
        const newList = new List({name:parameter,item:itemsArray});
        newList.save();
        res.redirect("/"+parameter);
      }
      else res.render("index",{HEADING:parameter,NEWiTEMS:list.item,buttonValue:parameter})
    }
    else console.log(err);
  })
});
