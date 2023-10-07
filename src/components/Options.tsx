import { Dispatch } from "react";
import Button from "./Button";
import { ActionType, TAction } from "../types";

type OptionsProps = {
	dispatch: Dispatch<TAction>;
	answer: number | null;
    options: string[];
	correctOption: number;
}

function Options (props : OptionsProps) {
	const {
		dispatch,
		answer,
		options,
		correctOption,
	} = props;
	
	const optionsArray = options.map((option, index) => {
		const answerClassName = answer === index ? 'answer' : '';
		const isCorrect = index === correctOption ? 'correct' : 'wrong';
		const isAnswered = answer !== null ? `${answerClassName} ${isCorrect}` : '';
		const optionClassName = `btn-option ${isAnswered}`;

		return (
			<Button
				key={index}
				className={optionClassName}
				onClick={() => dispatch({ type: ActionType.SETANSWER, payload: index })}
				disabled={answer !== null}
			>
				{option}
			</Button>
		);
	});

	return (
		<div className="options">
			{optionsArray}
		</div>
	);
}

export default Options;