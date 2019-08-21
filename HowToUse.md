# Users
### Log onto https://codefundo2019.tk. Then follow these steps:
- **Step 1**: On entering voting camp, the EVM will have our portal open, where the voter will have to enter the pass-phrase given to him in the pre-voting phase<br /> ![Page 1](https://user-images.githubusercontent.com/29022394/63441238-b8e4b400-c44e-11e9-8bcd-99385d0c05df.png)<br />
- **Step 2**: On supplying his pass-phrase, the portal will show a list of candidates from the constituency the voter is in. He will be able to choose one candidate to vote for.<br/> ![Page 2](https://user-images.githubusercontent.com/29022394/63441239-b97d4a80-c44e-11e9-9154-d200c9a06363.png)<br />
- **Step 3**: A confirmation page will pop up with the name and face of the candidate. The user will confirm his choice or be able to go back.<br/>![Page 3](https://user-images.githubusercontent.com/29022394/63441240-b97d4a80-c44e-11e9-9dc3-08aa28e2a479.png)<br/>
- **Step 4**: A QR code will be presented to the voter. The voter can then use the camera on his phone to confirm whether that vote is truly his.<br/> ![Page 4](https://user-images.githubusercontent.com/29022394/63441241-ba15e100-c44e-11e9-80a9-ede037b2ff4b.png)<br/>This ensures that the EVM has not been tampered with. Once that is confirmed, a confirmatory message is shown<br/>![Page 5](https://user-images.githubusercontent.com/29022394/63441242-ba15e100-c44e-11e9-9304-b36d118cd6a5.png)
<br/>

# Contributors

- [Install npm and nodejs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- **git clone https://github.com/never2average/CODEFUNDO-2019**

-  **npm -v**, if If you can see the version number, then you are ready to go! Please make sure that the version number is 5.0+. If it’s not, try to run **sudo apt-get install npm@5.0.0**

- **sudo npm install -g ganache-cli truffle**

- Open a new terminal and run **ganache-cli**

- In the same terminal open, **cd CODEFUNDO-2019/tempblockchain && truffle migrate**

- Copy the contract address of the 2_deploy_contracts.js file

- Replace the contract address in [server/index.js](https://github.com/never2average/CODEFUNDO-2019/tree/master/server) file

- Run like a normal js server file.
