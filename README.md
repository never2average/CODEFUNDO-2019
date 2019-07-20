# Microsoft Hackathon (codefundo++)

## The Idea

- It starts with generating a public-private keypair for the voter which enables the voter to vote.
- For this, we need to verify the person through adhar card or voter ID card API available here: https://electoralsearch.in/
- Once an initial verification is done, the person would be granted a secret passphrase required to vote at the voting camp.
- On voting camp, an additional facial ID recognition camera (true-depth technologies used by iPhone) is used to verify the identity of the person again through already available voter ID image. 
- In case the photo verification fails because of not able to recognize the person, there would be an official person sitting there to manually verify the identity of the voter and they'll be greylisted, i.e. they need to get their photo updated on their voter card before they can cast their vote next time.
- If verification succeeds, the person is then prompted to put their secret passphrase and is now able to cast vote.

## How it works?

## How to get started?

- **Voters**: Download the app for your mobile devices, bookmark elections, look at candidates and check your vote status and view live progress of public projects promised by politicians.
- **Others**: Download the desktop app from the executable folder and just run it.

## Technologies used
- Azure blockchain service
- Azure pipelines + functions
- Azure Table storage + cosmosDB
