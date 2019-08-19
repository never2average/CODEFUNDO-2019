import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { Typography } from '@material-ui/core'
import './styles.scss'

const maximum = 999999999999999
const minimum = 100000000000000
let randomNumber: number = 0

type Props = {
	disableNext(): void
	enableNext(): void
}

const ValidateChoice: React.FC<Props> = props => {

	const [serverResponse, setServerResponse] = useState<boolean>(false)

	useEffect(() => {
		randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
		props.disableNext()
	}, [])

	useEffect(() => {
		if(serverResponse) {
			props.enableNext()
		}
	}, [serverResponse])

	function enableNext() {
		setServerResponse(true)
	}

	if(randomNumber <= 0) return <div>Loading...</div>

	return (
		<div id="validate">
			<Typography variant="h4">{ serverResponse ? 'Confirmed. Your vote has been recorded. Please click on Finish below' : 'Please confirm your vote by scanning the QR code below:' }</Typography>

			<div id="qr-code" className={serverResponse ? 'done' : ''} onClick={enableNext}>
				<QRCode
					size={450}
					value={JSON.stringify({
						random: randomNumber,
						sessionID: 123456
					})}
				/>
			</div>
		</div>
	)
}

export default ValidateChoice