import { useQuiz } from '../context/useQuiz';
import { ActionType } from '../types';

import Button from './Button';

function StartContent() {
	const { questions, dispatch } = useQuiz();

	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{questions.length} questions to test your React mastery</h3>
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