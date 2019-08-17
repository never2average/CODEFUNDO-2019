import { createContext } from 'react'

type Voter = {
	name: string
	image: number
	checked: boolean
}

type Context = {
	passphrase: string
	voterlist: Voter[]
}

const state = {
	passphrase: '',
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
		case 'UPDATE_VOTER_LIST':
			return {
				...state,
				voterlist: payload
			}
	}

	return state
}

const StateProvider = createContext<{ state: Context, dispatch(obj: Dispatch): void }>({
	state,
	dispatch: () => 0
})

export const Provider = StateProvider.Provider
export const context = StateProvider
export const reducer = reducerFunc
export const defaultState = state