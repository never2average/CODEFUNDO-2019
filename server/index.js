const Web3 = require('web3')
const express = require('express')
const web3 = new Web3('ws://localhost:7545')
const abi = require('../../Desktop/tempblockchain/build/contracts/CodeFunDo.json')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

const map = {
	'ABCD': 'https://files.brightside.me/files/news/part_22/223005/preview-6210455-650x341-98-1508149182.jpg',
	'EFGH': 'https://inspiredot.net/wp-content/uploads/2018/10/Top-30-Most-Beautiful-Women-in-the-World-18-800x450.jpg',
	'IJKL': 'https://natimages-1tmxd3aba43noa.stackpathdns.com/data/images/full/43199/100-cities-with-the-most-beautiful-women-in-the-world.jpg',
	'MNOP': 'https://inspiredot.net/wp-content/uploads/2018/10/Top-30-Most-Beautiful-Women-in-the-World-13-800x450.jpg'
}

app.post('/passphrase', (req, res) => {
	try {
		const { passphrase } = req.body
		
		if(!map[passphrase]) throw new Error('Not Found')
		
		return res.json({ status: 'ok', image: map[passphrase] })
		
	} catch(error) {
		return res.json({ status: 'error', image: null })
	}
})

/*
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

})*/

app.listen(3001, () => console.log(`Server up`))