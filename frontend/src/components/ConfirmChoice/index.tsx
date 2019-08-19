import React, { useContext, useEffect } from 'react'
import { context } from '../../state'
import { Typography } from '@material-ui/core';
import './styles.scss'

type Props = {
	enableBack(): void
	disableBack(): void
}

const ConfirmChoice: React.FC<Props> = props => {

	const { state } = useContext(context)
	const voter = state.voterlist[state.activeVoteChoice]

	useEffect(() => {
		props.enableBack()
		return () => props.disableBack()
	}, [])

	return <div id="confirm">
		<img src={`/images/candidates/c${voter.image}.jpg`} id="voter-final" />
		<Typography variant="h4">Are you sure you want to vote <br /><b>{voter.name}</b>?</Typography>
	</div>
}

export default ConfirmChoice