// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
contract Lottery {
    address public owner;
    address payable [] public players;
    address [] public winners;
    uint public lotteryId;
    constructor() {
        owner = msg.sender;
        lotteryId = 0;
    }

    function enter() public payable  {
        require(msg.value>=0.1 ether);
        players.push(payable (msg.sender));
    }
    function getPlayers() public view returns(address payable [] memory) {
        return players;
    }
    function getBalance() public view returns (uint){
        return (address(this).balance);
    }
    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp , owner , lotteryId)));
    }

    function pickWinner() public  {
        require(msg.sender == owner);
        uint randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        lotteryId++;
        //clear the players array
        players = new address payable [](0);
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }
}
