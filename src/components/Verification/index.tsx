import React, { useState, useContext, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import './styles.scss'
import { context } from '../../state'
import fetch from '../../fetch'

type Props = {
	next(): void
	disableNext(): void
	enableNext(): void
}

const Verification: React.FC<Props> = props => {

	const { dispatch } = useContext(context)

	const [passphrase, setPassphrase] = useState<string>('')
	const [isValidated, setIsValidated] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [profilePic, setProfilePic] = useState<string>('/images/dummy.jpg')

	const [busy, setBusy] = useState<boolean>(false)

	useEffect(() => {
		props.disableNext()
		return () => props.enableNext()
	}, [])

	async function validatePassphrase() {
		setError('')
		setBusy(true)

		const res = await fetch(`http://40.114.1.168/passphrase`, {
			body: JSON.stringify({
				passphrase
			})
		})

		setBusy(false)

		if(res.status) {
			setIsValidated(true)
			setProfilePic('/images/person.jpg')
			dispatch({ type: 'UPDATE_PASSPHRASE', payload: passphrase })
			setTimeout(props.next, 1000)

		} else {
			setError('Incorrect passphrase')
		}
	}

	return <div id="verification">
		<div id="user-image">
			<img src={profilePic} />
		</div>

		{error && <div id="error">{error}</div>}

		<div id="passphrase">
			<TextField
				id="passphrase-field"
				label="Passphrase"
				value={passphrase}
				onChange={e => setPassphrase(e.target.value)}
				margin="normal"
				autoComplete="off"
				disabled={isValidated || busy}
				variant="filled"
			/>
			<Button
				id="validate-button"
				variant="contained"
				onClick={validatePassphrase}
				disabled={isValidated || busy}
				color="primary">
				{ busy ? 'Please wait...' : 'Verify'}
			</Button>
		</div>
	</div>
}

export default Verification