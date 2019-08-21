const Web3 = require('web3')
const express = require('express')
const web3 = new Web3('ws://localhost:7545')
const abi = require('../../Desktop/tempblockchain/build/contracts/CodeFunDo.json')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const voterList = require('./voter-list.json')

app.use(bodyParser.json())
app.use(cors())

const map = {
	'ABCD': {
		photo: 'https://files.brightside.me/files/news/part_22/223005/preview-6210455-650x341-98-1508149182.jpg',
		id: 0
	},
	'EFGH': {
		photo: 'https://inspiredot.net/wp-content/uploads/2018/10/Top-30-Most-Beautiful-Women-in-the-World-18-800x450.jpg',
		id: 1
	},
	'IJKL': {
		photo: 'https://natimages-1tmxd3aba43noa.stackpathdns.com/data/images/full/43199/100-cities-with-the-most-beautiful-women-in-the-world.jpg',
		id: 2
	},
	'MNOP': {
		photo: 'https://inspiredot.net/wp-content/uploads/2018/10/Top-30-Most-Beautiful-Women-in-the-World-13-800x450.jpg',
		id: 3
	}
}

let adminAddr
let contract


web3.eth.getAccounts().then(async addresses => {
	//console.log(addresses)
	web3.eth.defaultAccount = addresses[0]
	adminAddr = addresses[0]
	const { methods } = new web3.eth.Contract(abi.abi, '0xedCa809E513942B95D25e79069bBf99F8ef5D940')
	contract = methods
	
	await contract.addVoter(0x1234).send({ from: adminAddr, gas: '500000' })
	await contract.addVoter(0x4567).send({ from: adminAddr,  gas: '500000' })
	await contract.addVoter(0x891011).send({ from: adminAddr,  gas: '500000' })
	
	await contract.startVoting().send({ from: adminAddr,  gas: '500000' })
	console.log(await contract.vote(104, 1, 12, 0x891011).call())

	await contract.vote(100, 1, 10, 0x1234).send({ from: adminAddr,  gas: '500000' })
	await contract.vote(102, 1, 11, 0x4567).send({ from: adminAddr,  gas: '500000' })
	await contract.vote(104, 1, 12, 0x891011).send({ from: adminAddr,  gas: '500000' })

})

const pendingVotes = []

app.get('/get-stage', async (req, res) => {
	const stage = await contract.getCurrentStage()
	switch(stage) {
		case 0:
			return res.json({ stage: 'PREVOTING' })
		case 1:
			return res.json({ stage: 'VOTING' })
		case 2:
			return res.json({ status: 'POSTVOTING' })
	}
})

app.get('/startvoting', async (req, res) => {
	
	await contract.startVoting().send({ from: adminAddr,  gas: '500000' })

	res.json({ status: 'ok' })
})

app.get('/endvoting', async (req, res) => {
	await contract.endVoting().send({ from: adminAddr,  gas: '500000' })

	res.json({ status: 'ok' })
})



app.post('/passphrase', (req, res) => {
	try {
		const { passphrase } = req.body
		
		if(!map[passphrase]) throw new Error('Not Found')
		
		return res.json({ status: 'ok', image: map[passphrase] })
		
	} catch(error) {
		return res.json({ status: 'error', image: null })
	}
})

app.get('/voter-list', (req, res) => {
	res.json(voterList)
})

app.post('/validate-vote', async (req, res) => {
	try {

		console.log(`Attempting to validate vote`)

		const { random, sessionID } = req.body
		const vote = pendingVotes.find(e => e.random === random && e.sessionID === sessionID)

		if(!vote) throw new Error('Not found')

		vote.isVerified = true

		const candidate = voterList.list.find(t => t.name === vote.voter)

		await contract.vote(random, new Date().getTime(), candidate.id, map[vote.passphrase].id).send({ from: adminAddr,  gas: '500000' })

		return res.json({ status: 'ok' })
	} catch(error) {
		return res.json({ status: 'error' })
	}
})

app.post('/query-vote', (req, res) => {
	try {
		console.log(`Querying for vote`)
		const { random, sessionID } = req.body
		const vote = pendingVotes.find(e => e.random === random && e.sessionID === sessionID)

		if(!vote) throw new Error('Not Found ' + random + ' ' + sessionID)

		console.log(`Found vote`)
		if(vote.isVerified) return res.json({ status: 'done' })

		return res.json({ status: 'ok', data: vote })
	} catch(error) {
		console.log('Error!', error.message)
		return res.json({ status: 'error' })
	}
})


app.post('/submit-vote', (req, res) => {
	try {
		const { random } = req.body
		const maximum = 999999999999999
		const minimum = 100000000000000
		const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

		const { passphrase, voter } = req.body

		pendingVotes.push({
			passphrase,
			voter,
			random,
			sessionID: randomNumber,
			isVerified: false
		})

		console.log(pendingVotes)

		return res.json({ status: 'ok', data: { sessionID: randomNumber, random } })
	} catch(error) {
		return res.json({ status: 'error' })
	}
})




app.listen(3001, () => console.log(`Server up`))