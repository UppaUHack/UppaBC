//solium-disable linebreak-style
pragma solidity ^0.4.0;

contract Uppa{
    
    address public renter;
    string name = "Sample";
    
    constructor() public {
    }
    
    modifier checkAddress(address owner){
        require(owner!=msg.sender);
        _;
        
    }
    
    function rent(address owner, uint256 price, uint256 payback) public payable checkAddress(owner){
        renter = msg.sender;
        
        //require that the ether is equal the price and the payback payment
        require(uint256(msg.value) == ((price + payback) *1e18));
        
        emit Test(msg.value, (price + payback));
        owner.transfer(msg.value);
        emit Rent(owner, renter, owner.balance, renter.balance);
    }
    
    function returnObject(address _renter, uint256 payback) public payable checkAddress(_renter){
        require((payback * 1e18) == msg.value);
        _renter.transfer(msg.value);
        emit Return(_renter, _renter.balance);
    }

    function getName() public  returns(string _name){
        _name = name;
        emit Test2(name);
    }
    
    
    event Rent(address owner, address renter, uint256 ownerWallet, uint256 renterWallet);
    event Return(address _renter, uint256 _renterWallet);
    event Test(uint256 eth, uint256 totalPrice);
    event Test2(string ex);
    event Test3(address _renter);
}