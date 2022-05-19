pragma solidity >=0.7.0 <0.9.0;
//SPDX-License-Identifier: UNLICENSED
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract jackpot{

     address public admin;
     address payable winner;
     uint256 _moneypool;
     uint256 playerId;
     event userEntered(address user,uint _amount);
     event winnerAwarded(address user,uint _amount);

    constructor() {
         admin = msg.sender;
     }

    mapping (address=>uint256) private _balances; 
    address[] participants;

    function enter(ERC20 token, uint amountToPay) public payable {
        require(amountToPay > 0, "Please pay any amount to participate in jackpot");
        token.approve(address(this),amountToPay);
        token.transferFrom(msg.sender,address(this),amountToPay);
        participants.push(msg.sender);
        _balances[msg.sender]=amountToPay;
        _moneypool+=amountToPay;
        emit userEntered(msg.sender, amountToPay);
    }

     function getRandomNumber() public view returns(uint){
         return uint(keccak256(abi.encodePacked(admin,block.timestamp)));
    }

    function pickWinner() public returns(address){
        require(msg.sender==admin);
        uint id=getRandomNumber()% participants.length;
        winner= payable(participants[id]);
        return winner;
    }

     function getBalance() public view returns(uint){
         return address(this).balance;
     }

     function transferERC20(IERC20 token) public {
         require(msg.sender==admin);
         winner=payable(pickWinner());
        token.transfer(winner,_moneypool);
        _moneypool=0;
          emit winnerAwarded(winner,_moneypool);
    }   


   
    // function startLottery() public{}
    // function endLottery() public{}


}