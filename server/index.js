const prod = process.env.NODE_ENV === 'PRODUCTION'

const Web3 = require('web3')
const express = require('express')
const web3 = new Web3('ws://localhost:7545')
const abi = require(prod ? './CodeFunDo.json' : '../tempblockchain/build/contracts/CodeFunDo.json')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const voterList = require('./voter-list.json')

app.use(bodyParser.json())
app.use(cors())

const contractAddress = '0xB29BeAF61ce30c35F3D3407870531eba1F4CE440'

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
	},
	'PRIYESH': {
		photo: 'https://i.stack.imgur.com/RGBdi.jpg',
		id: 4
	},
	'ATHARV': {
		photo: 'https://i.stack.imgur.com/mc059.jpg',
		id: 5
	},
	'MEHUL': {
		photo: 'https://avatars3.githubusercontent.com/u/10388889?s=460&v=4',
		id: 6
	}
}

let adminAddr
let contract


web3.eth.getAccounts().then(async addresses => {
	//console.log(addresses)
	web3.eth.defaultAccount = addresses[0]
	adminAddr = addresses[0]
	const { methods } = new web3.eth.Contract(abi.abi, contractAddress)
	contract = methods
	
	const arr = Object.keys(map)

	for(let i=0;i<arr.length;i++) {
		const id = map[arr[i]].id
		await contract.addVoter(id).send({ from: adminAddr, gas: '500000' })
	}
})

const pendingVotes = []

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.get('/contract-address', (req, res) => {
	res.json({ address: contractAddress })
})

app.get('/get-stage', async (req, res) => {
	const stage = parseInt(await contract.getCurrentStage().call(), 10)


	switch(stage) {
		case 0:
			return res.json({ stage: 'PREVOTING' })
		case 1:
			return res.json({ stage: 'VOTING' })
		case 2:
			return res.json({ stage: 'POSTVOTING' })
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


app.post('/passphrase', async (req, res) => {
	try {
		const { passphrase } = req.body
		
		if(!map[passphrase]) throw new Error('Not Found')

		const hasVoted = await contract.hasVotedOrNot(map[passphrase].id).call()

		if(hasVoted) {
			return res.json({ status: 'error', message: 'Already voted' })
		}
		
		return res.json({ status: 'ok', data: map[passphrase] })
		
	} catch(error) {
		return res.json({ status: 'error', message: 'Incorrect ID' })
	}
})

app.get('/voter-list', (req, res) => {
	res.json(voterList)
})

app.post('/validate-vote', async (req, res) => {
	try {

		console.log(`Attempting to validate vote`)

		const { random, sessionID } = req.body
		const voteIndex = pendingVotes.findIndex(e => e.random === random && e.sessionID === sessionID)
		const vote = pendingVotes[voteIndex]

		if(!vote) throw new Error('Not found')
		
		vote.isVerified = true


		setTimeout(() => {
			// remove vote from pending after 10 seconds
			pendingVotes.splice(voteIndex, 1)

			console.log(`Pending votes now `, pendingVotes)
		}, 10*1000)
		
		const candidate = voterList.list.find(t => t.name === vote.voter)

		console.log(`Voting for candidate ${candidate.id} - ${map[vote.passphrase].id}`)

		console.log('Vote call before', await contract.vote(random, new Date().getTime(), candidate.id, map[vote.passphrase].id).call())

		await contract.vote(random, new Date().getTime(), candidate.id, map[vote.passphrase].id).send({ from: adminAddr,  gas: '500000' })
		
		console.log('Vote call after', await contract.vote(random, new Date().getTime(), candidate.id, map[vote.passphrase].id).call())

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

app.get('/results', async (req, res) => {

	const candidates = voterList.list

	const results = {}

	for(let i=0;i<candidates.length;i++) {
		const candidate = candidates[i]

		console.log(`ID: ${candidate.id}`)

		const votes = await contract.resultOfElection(candidate.id).call()
		results[candidate.name] = votes
	}

	res.json(results)
})


app.listen(3001, () => console.log(`Server up`))