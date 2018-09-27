var http = require("http");
var express = require("express");
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var app = express();

app.get('/', function(req, res){
    res.send(web3.eth.accounts[1]);
});

//Rent an object
app.post('/rent', function(req, res){

});

//Post object to DB
app.post('/object', function(req, res){

});

//Return an object
app.post('/return', function(req, res){

});

app.listen("3000", function(){
    console.log("Listening to port 3000");
});