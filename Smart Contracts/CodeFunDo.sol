pragma solidity >=0.4.21 <0.6.0;

// This contract will be the backend smart contract for the voting system, to interact with our blockchain
contract CodeFunDo{

address admin;

modifier onlyAdmin() {
    require (msg.sender==admin);
    _;
  }

  //structure to store votes's details
struct voteDetails{
    uint32 timestamp;
    uint16 candidateID;
    uint32 voterid;
  }

  //Mappings
  mapping (uint256=>voteDetails) voteList; // mapping of the randomly generated variable to all the voters 
  mapping (uint32=>bool) voted; //mapping from voterID to if that person has already voted or not
  mapping (uint32=>bool) isValidVoter; //mapping from voterID to if that person is a valid voter in that election
  
  //2D Array to store votes
  uint32[10000] voteCounter; //Assuming 10000 total candidates contest in that year's election

  //constructor
  constructor() public {
    //initialise admin credentials
    admin=msg.sender;
  }
  
  function addVoter(uint32 _voterid) onlyAdmin public returns (bool){ // Add a voter to the eligible voters list
      isValidVoter[_voterid]=true;
      return true;
  }
  
  function vote (uint256 _randomVariable,uint32 _timestamp,uint16 _candidateID,uint32 _voterid) public returns (uint8){ //Actually vote
      if(isValidVoter[_voterid]==false)
      {
          return 1;//code for voter is not a valid voter or is not registered to vote in this election
      }
      if(voted[_voterid]==true)
      {
          return 2;//code for voter has already voted
      }
      voteList[_randomVariable]=voteDetails(_timestamp,_candidateID,_voterid);
      voted[_voterid]=true;
      voteCounter[_candidateID]++;
      return 0;//code for successful vote
  }
  
  function resultOfElection(uint16 _candidateID) public onlyAdmin view returns (uint32){ //Can be called only after the elections are over by the admin
      return voteCounter[_candidateID];
  }
  
}