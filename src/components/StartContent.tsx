import { Dispatch, SetStateAction } from 'react';
import Button from './Button';

type StartContentProps = {
	quizLength: number;
	onStart: Dispatch<SetStateAction<boolean>>;
}

function StartContent(props: StartContentProps) {
	const {
		quizLength,
		onStart
	} = props;

	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{quizLength} questions to test your React mastery</h3>
			<Button
				className='btn-ui'
				onClick={() => onStart(true)}
			>
				Let's start
			</Button>
		</div>
	);
}

export default StartContent;