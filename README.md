# Microsoft Hackathon (codefundo++)

## The Idea

- It starts with generating a public-private keypair for the voter which enables the voter to vote.
- For this, we need to verify the person through adhar card or voter ID card API available here: https://electoralsearch.in/
- Once an initial verification is done, the person would be granted a secret passphrase required to vote at the voting camp.
- On voting camp, an additional facial ID recognition camera (true-depth technologies used by iPhone) is used to verify the identity of the person again through already available voter ID image. 
- In case the photo verification fails because of not able to recognize the person, there would be an official person sitting there to manually verify the identity of the voter and they'll be greylisted, i.e. they need to get their photo updated on their voter card before they can cast their vote next time.
- If verification succeeds, the person is then prompted to put their secret passphrase and is now able to cast vote.
- After the election is over, there will be a companion app which voters will be able to use to check the validity of the vote.

## The ideas we want to implement

- Each voter should be able to see his vote has been counted and be able to see who he voted for. This will ensure the elections are completely transparent.
- Each candidate should be able to see the number of votes he has gotten and be able to see that in a way which doesn't expose the identity of the voters. That can be done by storing the one-way hash values of the details of each voter and storing that as a list onto the chain. So the candidate can see it and just count, but won't know who voted for him. This will eradicate the accusations of EVM tampering and vote miscounting.
- The Election Commission should be able to see how many people voted. They can use it to generate statistics for the voting numbers at each constituency. This will ensure the reliability of the elections.

## Architecture of the implementation

The following is the architecture model we are planning to have:
- Each constituency will have a EVM which is basically a node on a private blockchain network created using Azure. There are 543 constituencies, so we will have a 544 node network (543 nodes + 1 node which is at the Election Commission office).
- 


## How to get started?

- **Voters**: Download the app for your mobile devices, bookmark elections, look at candidates and check your vote status and view live progress of public projects promised by politicians.
- **Others**: Download the desktop app from the executable folder and just run it.

## Technologies used
- Azure blockchain service
- Azure pipelines + functions
- Azure Table storage + cosmosDB
