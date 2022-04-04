var express = require("express")
const { connect } = require("./config/db")
var bodyParser = require('body-parser')
var flash = require('express-flash')
var app  = express()
var session =require("express-session");
var urLencoded = bodyParser.urlencoded({extended:false})
require("express-dynamic-helpers-patch")(app);
var path = require('path')
app.dynamicHelpers({session:function(req,res){
    return req.session;
}})

connect

app.use(express.json());
app.use(urLencoded)
app.use(flash());


app.use(session({
    secret:"kuch toh garbar h daya",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:24 * 60 * 60 * 1000,
    }
}))

var router = require('./route/router')
app.use("/",router)

app.set("view engine","pug")
app.set("views","./views")
app.use(express.static(path.join(__dirname, '/public')));

app.listen(8080)
console.log('Listening on port 8080');
