import React, { useReducer, useEffect, useState } from 'react'
import VotingSystem from './components/VotingSystem'
import { Provider, defaultState, reducer } from './state'
import { endpoint } from './config';

const App: React.FC = () => {

	const [state, dispatch] = useReducer(reducer, defaultState)
	const [stage, setStage] = useState<string>()
	
	useEffect(() => {
		fetch(`${endpoint}/get-stage`).then(res => res.json()).then(res => {
			setStage(res.stage)
		})
	}, [])

	return (
		<Provider value={{ state, dispatch }}>
			{ stage === 'VOTING' ? <VotingSystem /> : !stage ? '...Loading' : 'Voting not live yet' }
		</Provider>
	)
}

export default App