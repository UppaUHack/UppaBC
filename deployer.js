var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Compile Contract
let code = fs.readFileSync('Uppa.sol').toString();
let compiledCode = solc.compile(code);

//Deploy Contract
let abi = JSON.parse(compiledCode.contracts[':Uppa'].interface);
let UppaContract = web3.eth.contract(abi);
let byteCode  = compiledCode.contracts[':Uppa'].bytecode;
let deployedContract = UppaContract.new([], {data : byteCode, from: web3.eth.accounts[0], gas : 4700000});
let uppa = UppaContract.at(deployedContract.address);
console.log(uppa);

module.exports.uppa = uppa;
module.exports.default = web3.eth.accounts[0];