import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import Verification from '../Verification'
import VoterList from '../VoterList'
import ValidateChoice from '../ValidateChoice'
import ConfirmChoice from '../ConfirmChoice'
import Finish from '../Finish'
import './styles.scss'

function getSteps() {
  return [
	  'Person Verification', 
	  'Voter List', 
	  'Confirm Choice',
	  'Validate Choice',
	  'Finish'
	]
}

export default function HorizontalLinearStepper() {
	const [activeStep, setActiveStep] = useState<number>(1)

	const steps = getSteps()


	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	function getContent(step: number) {
		switch(step) {
			case 0:
				return <Verification 
					next={handleNext}
				/>
			case 1:
				return <VoterList />
			case 2:
				return <ConfirmChoice />
			case 3:
				return <ValidateChoice />
			case 4:
				return <Finish />
		}
	}

	return (
		<div id="interface">
			
			<Stepper activeStep={activeStep}>
			{steps.map(label => {
				return (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
				)
			})}
			</Stepper>

			<div id="content">
			{ getContent(activeStep) }
			</div>

			<div id="navigation">
				<Button
				variant="contained"
				color="primary"
				onClick={handleNext}>
					{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
				</Button>
			</div>

		</div>
	)
}