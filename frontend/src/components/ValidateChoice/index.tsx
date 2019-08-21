import React, { useEffect, useState, useContext } from 'react'
import QRCode from 'qrcode.react'
import { Typography } from '@material-ui/core'
import './styles.scss'
import fetch from '../../fetch'
import { endpoint } from '../../config';
import { context } from '../../state';

const maximum = 999999999999999
const minimum = 100000000000000
let randomNumber: number = 0

type Props = {
	disableNext(): void
	enableNext(): void
}

const ValidateChoice: React.FC<Props> = props => {

	const [serverResponse, setServerResponse] = useState<boolean>(false)
	const [sessionID, setSessionID] = useState<number>(-1)
	const [random, setRandom] = useState<number>(-1)

	const { state } = useContext(context)

	useEffect(() => {
		randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
		props.disableNext()

		console.log(state)

		fetch(`${endpoint}/submit-vote`, {
			body: JSON.stringify({
				random: randomNumber,
				passphrase: state.passphrase,
				voter: state.voterlist[state.activeVoteChoice].name
			})
		}).then(res => {
			setSessionID(res.data.sessionID)
			setRandom(res.data.random)
		})

	}, [])

	useEffect(() => {
		if(serverResponse) {
			props.enableNext()
		}
	}, [serverResponse])

	useEffect(() => {
		const intv = setInterval(async () => {
			
			const res = await fetch(`${endpoint}/query-vote`, {
				body: JSON.stringify({
					random,
					sessionID
				})
			})

			if(res.status === 'done') {
				setServerResponse(true)
			}
		}, 3000)

		return () => clearInterval(intv)
	}, [random, sessionID])

	if(randomNumber <= 0) return <div>Loading...</div>

	return (
		<div id="validate">
			<Typography variant="h4">{ serverResponse ? 'Confirmed. Your vote has been recorded. Please click on Finish below' : 'Please confirm your vote by scanning the QR code below:' }</Typography>

			<div id="qr-code" className={serverResponse ? 'done' : ''}>
				{ sessionID && random ? <QRCode
					size={450}
					value={JSON.stringify({
						random,
						sessionID
					})}
				/> : <p>Loading...</p> }
			</div>
		</div>
	)
}

export default ValidateChoice