import { useQuiz } from "../context/useQuiz";
import { ActionType } from "../types";

import Button from "./Button";

function Options () {
	const {
		answer,
		dispatch,
		index,
		questions
	} = useQuiz();

	const { options, correctOption } = questions[index];
	
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