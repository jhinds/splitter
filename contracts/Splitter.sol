pragma solidity ^0.4.15;

contract Splitter {

  address public owner;
  address public recipent1;
  address public recipent2;

  mapping(address => uint ) public accounts;

  // can initialize who your receipents are in here
  function Splitter(address _recipent1, address _recipent2) {
    owner = msg.sender;
    recipent1 = _recipent1;
    recipent2 = _recipent2;
  }

  event MoneySent(address sender, address sendee1, address sendee2, uint amount);
  event MoneyWithdrawn(address sendee, uint amount);
  event ContractKilled();

  function() payable { }

  // function to get balance of an address, either a participant or of the contract itself.
  function getBalance(address addressToCheck) constant returns (uint balance) {
    return accounts[addressToCheck];
  }

  function getContractBalance() constant returns (uint) {
    return this.balance;
  }

  // function to send money to addresses
  function sendMoney() payable returns (bool) {
    uint amount = msg.value;
    require(amount > 0);
    // might need some validation to ensure addresses are legit?
    uint leftoverMoney = amount % 2;
    accounts[recipent1] += amount/2;
    accounts[recipent2] += amount/2;
    accounts[owner] += leftoverMoney;
    MoneySent(msg.sender, recipent1, recipent2, amount);
    return true;
  }

  // could update so that user can specify how much they want to withdraw
  function withdrawMoney() payable returns (bool) {
    msg.sender.transfer(accounts[msg.sender]);
    accounts[msg.sender] = 0;
    MoneyWithdrawn(msg.sender, msg.value);
    return true;
  }

  // to kill the contract
  function killContract() returns (bool){
    require(msg.sender == owner);
    suicide(owner);
    ContractKilled();
    return true;
  }
}
