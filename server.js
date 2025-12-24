var express = require("express");
var server = express();
var bodyParser = require("body-parser");


server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")

var fileUpload = require("express-fileupload");

server.use(express.static(__dirname + "/Public"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:2*1024*1024}}))

var DB=require("nedb-promises");
var ServiceDB = DB.create(__dirname+"/Service.db");
var PorfolioDB = DB.create(__dirname+"/Porfolio.db");
var ContactDB = DB.create(__dirname+"/Contact.db");
// ServiceDB.insert([
//         { icon: 'fa-shopping-cart', title: 'E-Commerce', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.' },
//         { icon: 'fa-laptop', title: 'Responsive Design', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' },
//         { icon: 'fa-lock', title: 'Web Security', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' }
//     ])
//  PorfolioDB.insert( [
//         { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
//         { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
//     ])

server.get("/", (req, res) => {
    res.send("Hello world!");
})
server.get("/services", (req, res) => {
    //db 
    // var Services = [
    //     { icon: 'fa-shopping-cart', title: 'E-Commerce', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.' },
    //     { icon: 'fa-laptop', title: 'Responsive Design', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' },
    //     { icon: 'fa-lock', title: 'Web Security', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' }
    // ]
    ServiceDB.find({},{_id:0}).then(results=>{
       
        res.send(results);
    }).catch(error=>{

    })
    
})

server.get("/portfolio", (req, res) => {
    // var Portfolio = [
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
    // ]
    PorfolioDB.find({}).then(results=>{
        res.send(results);
    })
    
})


server.get("/showServices",(req,res)=>{
    ServiceDB.find({},{_id:0}).then(results=>{
       
        res.render("service",{Services:results});
    }).catch(error=>{

    })

})

server.get("/about", (req, res) => {
    res.send("Welcome " + req.query.user + " to My first NodeJS server!");
})


server.post("/contact", (req, res) =>{
    ContactDB.insert(req.body);
    //move to public/upload
    var upFile=req.files.myFile1;
    upFile.mv(__dirname+"/public/upload/"+upFile.name, function(err){
        if(err==null){
            res.render("msg",{message:"I got a file: "+upFile.name})
        }else{
            res.render("msg",{message:err});
        }
    })
})


server.listen(80)