const express = require("express");
const bodyParser = require("body-parser");
const getYear = require("./date");
const data = require(__dirname + "/date.js");

const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems=[];
let year = getYear();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", function(req, res){
    let today = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    let day = today.toLocaleDateString("pl-PL", option);
    res.render("list", {listTitle: day, newListItems: items, year: year})
    });


app.post("/", function(req,res){
    let newTask = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(newTask);
        res.redirect("/work");
    }else{
        items.push(newTask)
        res.redirect("/");
    }
    
    console.log(newTask);
    
});
    

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems, year: year});
});


app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");

});
