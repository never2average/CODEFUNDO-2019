
# Secure Electronic Voting using Azure Blockchain 

## Our Aim

We aim to tackle two issues which plague the current system of Electronic Voting Machines,

 1. Delayed vote counting and result declaration - The whole 2019 Lok Sabha Election process took just over 2 months to complete. We believe this can be accelerated using Blockchain
 2. Accusations of tampering EVMs - By using properties of immutability of blockchains, we believe EVMs can be made virtually tamper-proof.

## Proposed Stages

We want our election Proof-of-Concept to be modelled around the following stages:

### Before Polling Day
####  Voter Verification:
- First, we need to verify the person through aadhar card or voter ID card API available here: https://electoralsearch.in/ 
- Secondly, a picture of the person will be taken, which will be used later on.
- Then, a public-private keypair for the voter will be generated, which essentially registers the voter on the chain as a valid voter.
- Finally, the person would be granted a secret passphrase (generated from the private key)required to vote at the voting camp.
### On Polling Day
#### To Enter the Voting Camp:
- On entering voting camp, a facial ID recognition camera (even sub-10,000 Rupee smartphones have this technology nowadays) is used to verify the identity of the person through already available voter ID image. 
- In case the photo verification fails because of not able to recognize the person, there would be an official person sitting there to manually verify the identity of the voter. That person will also be added to a separate list, which houses the names of the people whose voter ID photos need to be updated.
#### At the EVM:
- If verification succeeds, the person is then prompted to put their secret passphrase and is now able to cast vote.
### After Polling Day
- After the election is over, there will be a companion app which voters will be able to use to check the validity of the vote and the results of the election.

## Characteristics of our project
We aim to implement the following features to make our system secure, reliable, and transparent.

- Each voter should be able to see his vote has been counted and be able to see who he voted for. This will ensure the elections are completely transparent.
- Each candidate should be able to see the number of votes he has gotten and be able to see that in a way which doesn't expose the identity of the voters. That can be done by storing the one-way hash values of the details of each voter and storing that as a list onto the chain. So the candidate can see it and just count, but won't know who voted for him. This will eradicate the accusations of EVM tampering and vote miscounting.
- The Election Commission should be able to see how many people voted. They can use it to generate statistics for the voting numbers at each constituency. This will ensure the reliability of the elections.

## Architecture of the Blockchain Implementation

The following is the architecture model we are planning to have:
- Each constituency will have a EVM which is basically a node on a private blockchain network created using Azure. There are 543 constituencies, so we will have a 544 node network (543 nodes + 1 node which is at the Election Commission office).

## Technologies used
- Azure Blockchain Workbench
- Azure Pipelines and Functions
- Azure Table storage + SQL Database Manager
