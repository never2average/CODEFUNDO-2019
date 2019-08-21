import React, { useState, useRef } from 'react'
import './App.css'
import QrReader from 'react-qr-reader'

const endpoint = 'https://codefundo2019.tk'

// Problems solved: 
// 1. Tamper proofing voting system
// 2. Digitizing voting mechanism

function App() {

	const [res, setRes] = useState()
	const [scanDone, setScanDone] = useState(false)
	const [doneStatus, setDoneStatus] = useState('')

	async function handleScan(res) {
		try {
			const json = JSON.parse(res)
			const keys = Object.keys(json)
			//setRes(json.random + json.sessionID)
			if(keys.length === 2 && json.random && json.sessionID) {
				setScanDone(true)
				const res = await (await fetch(endpoint+'/query-vote', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						random: json.random,
						sessionID: json.sessionID
					})
				})).json()

				setRes(res.data)
			}
		} catch(error) {
			//
		}
	}

	async function confirmVote() {
		const r = await (await fetch(`${endpoint}/validate-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				random: res.random,
				sessionID: res.sessionID
			})
		})).json()
		if(r.status) {
			setDoneStatus('Thank you for voting. You can close this window')
		}
	}

	function ShowVotingControls() {
		if(!res) return <p>Please wait...</p>
		return <div id="confirmation">
			<h1>You're about to vote {res.voter}. Press the button below to confirm</h1>
			<button onClick={confirmVote}>Confirm your vote</button>
		</div>
	}

	return (
		<div id="scanner">
			<div id="result">{doneStatus}</div>
			{doneStatus || <>
				{scanDone ? <ShowVotingControls /> : <QrReader
					delay={100}
					onScan={handleScan}
					style={{ width: '400px', height: '400px' }}
					/>}
				</>}
		</div>
	)
}

export default App;
