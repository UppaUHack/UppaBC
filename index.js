var http = require("http");
var express = require("express");
var Web3 = require('web3');
var deployer = require('./deployer');
var fs = require('fs');
var bodyParser = require('body-parser');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));


app.get('/', function(req, res){
    // deployer.uppa.getName.call([], (err, result) => {
    //     console.log(result);
    // });
    // res.writeHead(200, {'Content-Type' : 'text/html'});
    // let readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    // readStream.pipe(res);
    let tmp = deployer.uppa.rent.sendTransaction('0x189fdb1106866fb6806b74a2a1f3ecba9b383971', 1, 1,
        {from:web3.eth.accounts[1],
        value: 2000000000000000000,
        gas: 999999
        }
    );
    console.log(tmp);
    res.send(tmp);
});

app.get('/a', function(req, res){
    res.send(deployer.uppa._eth.accounts[1]);
});

//Rent an object
app.post('/rent', function(req, res){
   let addr = req.body.address;
   res.send(
        'Address : ' + addr + '<br/>' +
        'Balance : ' + deployer.uppa._eth.getBalance(addr) +
        '<form action = "/rent/' + addr + '" method = "POST">' + 
        '<label>Owner : </label><input type = "text" name = "owner"/><br/>' +
        '<label>Price : </label><input type = "number" name = "price"><br/>"' +
        '<label>Payback : </label><input type="number" name = "payback">' +
         '<input type="submit" name = "submit">' + 
         '</form>'
   );
});

app.post('/rent/:addr', function(req, res){
        let owner = req.params.owner;
        let price = req.params.price;
        let payback = req.params.payback;  

        deployer.uppa.rent.sendTransaction(owner, price, payback, {
        from : req.params.addr, 
        value : 40000000000000000000,
        gas : 444107
        });
   
    res.send("Success");
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