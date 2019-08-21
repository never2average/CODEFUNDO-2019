# Users

- log onto https://codefundo2019.tk

# Contributors

- [Install npm and nodejs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- **git clone https://github.com/never2average/CODEFUNDO-2019**

-  **npm -v**, if If you can see the version number, then you are ready to go! Please make sure that the version number is 5.0+. If it’s not, try to run **sudo apt-get install npm@5.0.0**

- **sudo npm install -g ganache-cli truffle**

- Open a new terminal and run **ganache-cli**

- In the same terminal open, **cd CODEFUNDO-2019/tempblockchain && truffle migrate**

- Copy the contract address of the 2_deploy_contracts.js file

- replace the contract address in [server/index.js](https://github.com/never2average/CODEFUNDO-2019/tree/master/server) file

- Run like a normal js server file.
