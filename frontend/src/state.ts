import { createContext } from 'react'

type Voter = {
	name: string
	image: number
	checked: boolean
}

type Context = {
	passphrase: string
	voterlist: Voter[]
	activeVoteChoice: number
}

const initialState = {
	passphrase: '',
	activeVoteChoice: -1,
	voterlist: []
}

type Dispatch = {
	type: string
	payload: any
}

function reducerFunc(state: Context, action: Dispatch) {
	const { type, payload } = action
	switch(type) {
		case 'UPDATE_PASSPHRASE':
			return {
				...state,
				passphrase: payload
			}
		case 'SET_CURRENT_VOTER':
			return {
				...state,
				activeVoteChoice: payload
			}
		case 'RESET':
			return initialState
		case 'UPDATE_VOTER_LIST':
			return {
				...state,
				voterlist: payload
			}
	}

	return state
}

const StateProvider = createContext<{ state: Context, dispatch(obj: Dispatch): void }>({
	state: initialState,
	dispatch: () => 0
})

export const Provider = StateProvider.Provider
export const context = StateProvider
export const reducer = reducerFunc
export const defaultState = initialState