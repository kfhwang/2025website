var express = require("express");
var server = express();
var bodyParser = require("body-parser");

server.use(express.static(__dirname+"/Public"));
server.use(bodyParser.urlencoded());



server.get("/", (req,res)=>{
    res.send("Hello world!");
})
server.get("/services", (req,res)=>{
    //db 
    var Services= [
                {icon:'fa-shopping-cart', title:'E-Commerce', text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.'},
                {icon:'fa-laptop', title:'Responsive Design', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'},
                {icon:'fa-lock', title:'Web Security', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'}
            ]
    res.send(Services);
})

server.get("/portfolio", (req,res)=>{

})

server.get("/about", (req,res)=>{
    res.send("Welcome "+req.query.user+" to My first NodeJS server!");
})

server.listen(80)