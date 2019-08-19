import React, { useReducer } from 'react'
import VotingSystem from './components/VotingSystem'
import { Provider, defaultState, reducer } from './state'

const App: React.FC = () => {

	const [state, dispatch] = useReducer(reducer, defaultState)
	
  return (
  	<Provider value={{ state, dispatch }}>
		  <VotingSystem />
	</Provider>
  )
}

export default App