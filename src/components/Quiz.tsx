import { Dispatch } from "react";
import { ActionType, TAction, Tquestion } from "../types";
import Options from "./Options";

type QuizProps = {
	currentQuestion: Tquestion;
	dispatch: Dispatch<TAction>;
	isAnswer: boolean;
}

function Quiz (props: QuizProps) {
	const {
		currentQuestion,
		dispatch,
		isAnswer
	} = props;

	const {
		question,
		options,
		correctOption,
		points
	} = currentQuestion;

	function handleCorrectAnswer (index: number) {
		dispatch({ type: ActionType.SETANSWER, payload: true });
		dispatch({ type: ActionType.SETPROGERSS });

		if(index === correctOption) {
			dispatch({ type: ActionType.SETSCORE, payload: points });
		}
	}

	return(
		<div>
			<h4>{question}</h4>
			<Options 
				options={options}
				onCorrectAnswer={handleCorrectAnswer}
				correctOption={correctOption}
				isAnswer={isAnswer}
			/>
		</div>
	);
}

export default Quiz;