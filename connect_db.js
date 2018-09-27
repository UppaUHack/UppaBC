var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "username",
    password : "p455w0rd"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
});