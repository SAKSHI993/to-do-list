//jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();
const date=require(__dirname+"/date.js");

let items=["eat","sleep","repeat"];
let workItems=[];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  let day=date.getDate();
  res.render("list", { listTitle: day, newListItems: items
  });
});

app.get("/about", function(req,res){
  res.render("about");
});
app.post("/",function(req,res){
  let item=req.body.newItem;
  if(req.body.list==="work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work",function(req,res){
  res.render("list",{listTitle:"work List",newListItems:workItems});
});


// So what this does is when a post request is triggered on our home route, we'll save the value of new
// item in that text box to a letiable called item and it will redirect to the home route which then
// gets us over here and triggers the app.get for our home route.
// And it will res.render the list template passing in both the listTitle as well as the newList
// Item.

app.listen(3000, function() {
  console.log("server has started on port 3000");
});
