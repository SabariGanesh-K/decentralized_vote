//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Greeter {
    struct voters{
        address _add;
    }
    voters[] yesvoters;
    voters[] novoters; 
   

mapping(address => bool) private isvoted;
modifier hasvoted(address _add) {
        require(!isvoted[_add], "This wallet has already been added");
        _;
    }



    function fetchyesvoters() public view returns (voters[] memory){
        return yesvoters;
    }
        function fetchnovoters() public view returns (voters[] memory){
        return novoters;
    }

    function voteyes() public hasvoted(msg.sender){
        isvoted[msg.sender] = true;
        yesvoters.push(
            voters(msg.sender)
        );
    }
    
       function voteno() public hasvoted(msg.sender){
        isvoted[msg.sender] = true;
        novoters.push(
            voters(msg.sender)
        );
    }

    function clearall() public  payable  {
       for (uint i=0;i<yesvoters.length;i++){
           yesvoters.pop();
       }

       for (uint j=0;j<novoters.length;j++){
           novoters.pop();
       }
    }


}
