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
	voterlist: [
		{
			name: 'Enrique West',
			image: 1,
			checked: false
		},
		{
			name: 'Damien Braun',
			image: 2,
			checked: false
		},
		{
			name: 'Ellie Osborne',
			image: 3,
			checked: false
		},
		{
			name: 'Cierra Vega',
			image: 4,
			checked: false
		},
		{
			name: 'Alden Cantrell',
			image: 5,
			checked: false
		},
		{
			name: 'Kierra Gentry',
			image: 6,
			checked: false
		},
		{
			name: 'Pierre Cox',
			image: 7,
			checked: false
		}
	]
}

type Dispatch = {
	type: string
	payload: any
}

function reducerFunc(state: Context, action: Dispatch) {
	const { type, payload } = action
	switch(type) {
		case 'CHANGE_PASSPHRASE':
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