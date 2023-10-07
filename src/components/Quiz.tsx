import { Dispatch } from "react";
import { TAction, Tquestion } from "../types";
import Options from "./Options";

type QuizProps = {
	currentQuestion: Tquestion;
	dispatch: Dispatch<TAction>;
	answer: number | null;
}

function Quiz (props: QuizProps) {
	const {
		currentQuestion,
		dispatch,
		answer
	} = props;

	const {
		question,
		options,
		correctOption,
	} = currentQuestion;


	return(
		<div>
			<h4>{question}</h4>
			<Options 
				dispatch={dispatch}
				options={options}
				correctOption={correctOption}
				answer={answer}
			/>
		</div>
	);
}

export default Quiz;