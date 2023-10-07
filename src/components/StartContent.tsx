import { Dispatch } from 'react';
import Button from './Button';
import { ActionType, TAction } from '../types';

type StartContentProps = {
	quizLength: number;
	dispatch: Dispatch<TAction>;
}

function StartContent(props: StartContentProps) {
	const {
		quizLength,
		dispatch
	} = props;

	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{quizLength} questions to test your React mastery</h3>
			<Button
				className='btn-ui'
				onClick={() => dispatch({ type: ActionType.START })}
			>
				Let's start
			</Button>
		</div>
	);
}

export default StartContent;