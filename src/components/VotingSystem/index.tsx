import React, { useState, useContext } from 'react'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import Verification from '../Verification'
import VoterList from '../VoterList'
import ValidateChoice from '../ValidateChoice'
import ConfirmChoice from '../ConfirmChoice'
import './styles.scss'
import { context } from '../../state';

function getSteps() {
  return [
	  'Person Verification', 
	  'Voter List', 
	  'Confirm Choice',
	  'Validate Choice'
	]
}

export default function VotingSystem() {

	const { dispatch } = useContext(context)

	const [activeStep, setActiveStep] = useState<number>(0)
	const [nextDisabled, setNextDisabled] = useState<boolean>(false)
	const [backDisabled, setBackDisabled] = useState<boolean>(true)

	const steps = getSteps()


	function handleNext() {

		if(activeStep === 3) {
			// done
			setActiveStep(0)
			dispatch({ type: 'RESET', payload: null })
		} else {
			setActiveStep(prevActiveStep => prevActiveStep + 1)
		}

	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	function disableNext() {
		setNextDisabled(true)
	}

	function enableNext() {
		setNextDisabled(false)
	}

	function disableBack() {
		setBackDisabled(true)
	}

	function enableBack() {
		setBackDisabled(false)
	}


	function getContent(step: number) {
		switch(step) {
			case 0:
				return <Verification 
					next={handleNext}
					disableNext={disableNext}
					enableNext={enableNext}
				/>
			case 1:
				return <VoterList 
					disableNext={disableNext}
					enableNext={enableNext}
				/>
			case 2:
				return <ConfirmChoice
						enableBack={enableBack}
						disableBack={disableBack}
					/>
			case 3:
				return <ValidateChoice 
						enableNext={enableNext}
						disableNext={disableNext}
					/>
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
				<div id="navigation">
					
					{ backDisabled || <Button
						variant="contained"
						color="primary"
						disabled={backDisabled}
						onClick={handleBack}>
						Back
					</Button>}

					{ nextDisabled || <Button
					variant="contained"
					color="primary"
					disabled={nextDisabled}
					onClick={handleNext}>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>}

				</div>
			</div>

		</div>
	)
}