import { Dispatch } from "react";
import { ActionType, TAction } from "../types";
import Button from "./Button";
import Timer from "./Timer";

type QuizFooterProps = {
	dispatch: Dispatch<TAction>;
	isAnswer: boolean;
	isQuizFinished: boolean;
	secondsRemaining: number;
}

function QuizFooter (props: QuizFooterProps) {
	const {
		dispatch,
		isAnswer,
		isQuizFinished,
		secondsRemaining
	} = props;

	function handleNextQuestion () {
		if(isQuizFinished) {
			dispatch({ type: ActionType.SETHIGHSCORE });
			dispatch({ type: ActionType.FINISH });
			return;
		}

		dispatch({ type: ActionType.NEXTQUESTION });
		dispatch({ type: ActionType.SETANSWER, payload: false });
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
			{isAnswer && buttonContent}
		</footer>
	);
}

export default QuizFooter;