import { Dispatch } from "react";
import { ActionType, TAction } from "../types";
import Button from "./Button";
import Timer from "./Timer";

type QuizFooterProps = {
	dispatch: Dispatch<TAction>;
	answer: number | null;
	isQuizFinished: boolean;
	secondsRemaining: number;
}

function QuizFooter (props: QuizFooterProps) {
	const {
		dispatch,
		answer,
		isQuizFinished,
		secondsRemaining
	} = props;

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