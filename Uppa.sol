//solium-disable linebreak-style
pragma solidity ^0.4.0;

contract Uppa{
    
    address public renter;
    
    constructor() public {
    }
    
    modifier checkAddress(address owner){
        require(owner!=renter);
        _;
        
    }
    
    function rent(address owner, uint256 price, uint256 payback) public payable checkAddress(owner){
        renter = msg.sender;
        //require(msg.value == (price + payback));
        owner.transfer(msg.value);
        emit Rent(owner, renter, owner.balance, renter.balance);
    }
    
    function returnObject(address _renter, uint256 payback) public payable{
        //require(payback == msg.value);
        _renter.transfer(msg.value);
        emit Return(_renter, _renter.balance);
    }
    
    
    event Rent(address owner, address renter, uint256 ownerWallet, uint256 renterWallet);
    event Return(address _renter, uint256 _renterWallet);
    
}