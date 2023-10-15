import { useQuiz } from "../context/useQuiz";
import { ActionType } from "../types";

import Button from "./Button";
import Timer from "./Timer";

function QuizFooter () {
	const {
		answer,
		dispatch,
		index,
		questions,
		secondsRemaining,
	} = useQuiz();

	const isQuizFinished = questions.length === index + 1;

	function handleNextQuestion () {
		if(isQuizFinished) {
			return dispatch({ type: ActionType.FINISH });
		}
		dispatch({ type: ActionType.NEXTQUESTION });
	}

	const buttonContent = (
		<Button 
			className="btn-ui"
			onClick={handleNextQuestion}
		>
			{isQuizFinished ? 'Finish' : 'Next'}
		</Button>
	);

	return (
		<footer>
			<Timer
				secondsRemaining={secondsRemaining}
				dispatch={dispatch}
			/>
			{answer !== null && buttonContent}
		</footer>
	);
}

export default QuizFooter;