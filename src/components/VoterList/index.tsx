import React, { useState, useContext } from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import './styles.scss'
import { context } from '../../state';

type Detail = {
	name: string
	image: number
	checked: boolean
}

const VoterList: React.FC = props => {

	const { state, dispatch } = useContext(context)

	function handleToggle(val: boolean, index: number) {
		const d = state.voterlist.map(t => ({ ...t, checked: false }))
		d[index].checked = val

		dispatch({ type: 'UPDATE_VOTER_LIST', payload: d })
	}

	return (
		<List dense id="voter-list">
			{state.voterlist.map((value, i) => {
				return (
				<ListItem key={i} button onClick={e => handleToggle(true, i)}>
					<ListItemAvatar>
					<Avatar
						src={`/images/candidates/c${value.image}.jpg`}
					/>
					</ListItemAvatar>
					<ListItemText primary={value.name} />
					<ListItemSecondaryAction>
					<Checkbox
						edge="end"
						onChange={e => handleToggle(e.target.checked, i)}
						checked={value.checked}
					/>
					</ListItemSecondaryAction>
				</ListItem>
				)
			})}
    </List>
	)
}

export default VoterList