var express = require('express');
var port = 3000;

var bodyParser = require("body-parser");
var DataStore = require('nedb');


var BASE_API_PATH = "/api/v1"
var DB_FILE_NAME = __dirname + "/contacts.json";


console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

var bd = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});


app.get("/",(req,res) =>{

    res.send("<html><body><h1>My server</h1></body></html>");
});



app.get(BASE_API_PATH + "/conts",(req,res) =>{

    console.log(Date() + " - GET /conts");

    bd.find({},(err, contacts) => {


        if (err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        }else{
            res.send(contacts.map((contact) => {
                delete contact._id;
                return contact;
            })); 
        }
    });
});



app.post(BASE_API_PATH + "/conts",(req,res) =>{

    console.log(Date() + " - POST /conts");
    var cont = req.body;
    bd.insert(contact, (err) => {
        if (err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
    
});


app.listen(port);
console.log("Server ready!");