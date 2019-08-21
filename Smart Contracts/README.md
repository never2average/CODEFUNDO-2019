


# The Smart Contract

## Functionalities provided
We have provided the following functionalities to our voting system using the Smart Contract:

 ### 1. **getCurrentStage** 
  A getter function to get the current stage of the voting going on (Pre-Voting,Voting or Post-Voting). Returns the following based on the stages:
  0 - Current Stage of the process is pre-voting
  1 - Current Stage of the process is voting
  2 - Current Stage of the process is post-voting
  
### 2.  addVoter
Adds a valid voter to the mapping of eligible voters. Takes the ID of the voter as a parameter. Returns true if the voter has been successfully added. It returns false if the voting process is not at the Pre-Voting Stage.
 
 ### 3. vote
 Allows a valid voter to vote. Takes the following parameters:
 
 - A random variable to anonymize the identity of the voter in the voteList mapping
 - The timestamp of the voter (used for verification later)
 - The candidate ID of the person who the voter has voted for
 - The voter ID of the voter

It returns the following values:
0 - If the vote was successful
1 - If the voter ID entered does not correspond to a valid voter
2 - If the voter has already voted in this election
3 - If the Voting Stage has not started yet

###  4. startVoting
Changes the stage if the election from Pre-Voting to Voting.

### 5.endVoting

 Changes the stage if the election from Voting to Post-Voting.
 ### 6. hasVotedOrNot
 Takes the voter ID of the voter as a parameter. Returns:
 

 - True if the voter has voted already 
 - False if he has not
### 7. resultOfElection
Takes the candidate ID of the candidate you want to find the result for. Returns an integer, which is the number of votes he has received in the election. Returns 999999999 if the Post-Voting stage has not begun yet.
