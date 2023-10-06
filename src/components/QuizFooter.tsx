import { Dispatch } from "react";
import { ActionType, TAction } from "../types";
import Button from "./Button";

type QuizFooterProps = {
	dispatch: Dispatch<TAction>
}

function QuizFooter (props: QuizFooterProps) {
	const {
		dispatch
	} = props;

	// function handleNextQuestion () {

	// }

	return (
		<footer>
			<div className="timer">timer</div>
			<Button 
				className="btn-ui"
				onClick={() => dispatch({ type: ActionType.NEXTQUESTION })}
			>
				Next
			</Button>
		</footer>
	);
}

export default QuizFooter;