import React, { useState, useContext, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import './styles.scss'
import { context } from '../../state'

type Props = {
	disableNext(): void
	enableNext(): void
}

const VoterList: React.FC<Props> = props => {

	const { state, dispatch } = useContext(context)
	const [voterlist, setVoterlist] = useState(state.voterlist)

	useEffect(() => {
		if(state.activeVoteChoice !== -1) {
			const list = JSON.parse(JSON.stringify(voterlist))
			list[state.activeVoteChoice].checked = true
			setVoterlist(list)
		}
	}, [])

	useEffect(() => {
		if(state.activeVoteChoice === -1) {
			props.disableNext()
		} else {
			props.enableNext()
		}
	}, [state.activeVoteChoice])

	function handleToggle(val: boolean, index: number) {
		const d = voterlist.map(t => ({ ...t, checked: false }))
		d[index].checked = val
		setVoterlist(d)

		dispatch({ type: 'SET_CURRENT_VOTER', payload: val ? index : -1 })
	}

	return (
		<List dense id="voter-list">
			{voterlist.map((value, i) => {
				return (
				<ListItem key={i} button onClick={e => handleToggle(!value.checked, i)}>
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