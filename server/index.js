const Web3 = require('web3')

const web3 = new Web3('ws://localhost:7545')

const abi = require('../../Desktop/tempblockchain/build/contracts/CodeFunDo.json')

web3.eth.getAccounts().then(async addresses => {
	//console.log(addresses)
	web3.eth.defaultAccount = addresses[0]
	const adminAddr = addresses[0]
	const { methods: contract } = new web3.eth.Contract(abi.abi, '0xedCa809E513942B95D25e79069bBf99F8ef5D940')

	await contract.addVoter(0x1234).send({ from: adminAddr, gas: '500000' })
	await contract.addVoter(0x4567).send({ from: adminAddr,  gas: '500000' })
	await contract.addVoter(0x891011).send({ from: adminAddr,  gas: '500000' })
	
	await contract.startVoting().send({ from: adminAddr,  gas: '500000' })
	console.log(await contract.vote(104, 1, 12, 0x891011).call())

	await contract.vote(100, 1, 10, 0x1234).send({ from: adminAddr,  gas: '500000' })
	await contract.vote(102, 1, 11, 0x4567).send({ from: adminAddr,  gas: '500000' })
	await contract.vote(104, 1, 12, 0x891011).send({ from: adminAddr,  gas: '500000' })


	await contract.endVoting().send({ from: adminAddr,  gas: '500000' })
	
	console.log(await contract.resultOfElection(10).call())//({ from: addresses[0] }))
	console.log(await contract.resultOfElection(11).call())//({ from: addresses[0] }))

})