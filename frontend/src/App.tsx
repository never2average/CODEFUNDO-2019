import React, { useReducer, useEffect, useState } from 'react'
import VotingSystem from './components/VotingSystem'
import { Provider, defaultState, reducer } from './state'
import { endpoint } from './config'
import './App.css'

function NotLive() {
	return <div id="not-live" style={{position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<h1>Voting not live yet</h1>
	</div>
}

const App: React.FC = () => {

	const [state, dispatch] = useReducer(reducer, defaultState)
	const [stage, setStage] = useState<string>()
	const [address, setAddress] = useState<string>()
	
	useEffect(() => {
		fetch(`${endpoint}/get-stage`).then(res => res.json()).then(res => {
			setStage(res.stage)
		})

		fetch(`${endpoint}/contract-address`).then(res => res.json()).then(res => {
			setAddress(res.address)
		})
	}, [])

	return (
		<Provider value={{ state, dispatch }}>
			{ stage === 'VOTING' ? <VotingSystem /> : !stage ? '...Loading' : <NotLive /> }

			{address && <p id="contract-address">Contract address: {address}</p>}
		</Provider>
	)
}

export default App