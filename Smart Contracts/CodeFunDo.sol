pragma solidity >=0.4.21 <0.6.0;

// This contract will be the backend smart contract for the voting system, to interact with our blockchain
contract CodeFunDo{

address admin;

//State Declaration
enum StateType { PreVoting, Voting, PostVoting} //Too store what stage of the election is currently going on
StateType public  State;

//Only Admin modifier
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
  
  //Events
  event evoterAdded(uint32 voterID);
  event evotingstarted();
  event evotervoted(uint32 voterID);
  event evotingended();
  event eresult(uint16 candidateID,uint32 votes);
  
  
  //constructor
  constructor() public {
    //initialise admin credentials
    admin=msg.sender;
    State=StateType.PreVoting;//Making the state of the voting the pre-voting state
  }
  
  function getCurrentStage() public view returns (uint8){
      if(State==StateType.PreVoting)
    {
        return 0; // Current Stage of voting is pre-voting
    }
    if(State==StateType.Voting)
    {
        return 1; // Current Stage of voting is voting
    }
    if(State==StateType.PostVoting)
    {
        return 2; // Current Stage of voting is post-voting
    }
  }
  
  function addVoter(uint32 _voterid) onlyAdmin public returns (bool){ // Add a voter to the eligible voters list
    if(State!=StateType.PreVoting)
    {
        return false;// Cannot add new voters unless it is pre voting season
    }
      isValidVoter[_voterid]=true;
      emit evoterAdded(_voterid);
      return true;
  }
  
  function startVoting() onlyAdmin public returns (bool){ //Function to indicate the start of voting season
      State=StateType.Voting;
      emit evotingstarted();
      return true;
  }
  
  function vote (uint256 _randomVariable,uint32 _timestamp,uint16 _candidateID,uint32 _voterid) public returns (uint8){ //Actually vote
      if(State!=StateType.Voting)
        {
            return 3;//code for if voting season has not begun
        }
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
      emit evotervoted(_voterid);
      return 0;//code for successful vote
  }
  
  function hasVotedOrNot(uint32 _voterid) public view returns (bool){
      return voted[_voterid];
  }
  
  function endVoting() onlyAdmin public returns (bool){ //Function to indicate the end of voting season
      State=StateType.PostVoting;
      emit evotingended();
      return true;
  }
  
  function resultOfElection(uint16 _candidateID) public returns (uint32){ //Can be called only after the elections are over by the admin
  if(State!=StateType.PostVoting)
        {
            return 999999999;//code for if voting season has not ended
        }
        emit eresult(_candidateID,voteCounter[_candidateID]);
      return voteCounter[_candidateID];
  }
  
}