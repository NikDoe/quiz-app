import Button from "./Button";

type OptionsProps = {
    options: string[];
	onCorrectAnswer: (index: number) => void;
	correctOption: number;
	isAnswer: boolean;
}

function Options (props : OptionsProps) {
	const {
		options,
		onCorrectAnswer,
		correctOption,
		isAnswer
	} = props;
	
	const optionsArray = options.map((option, index) => {
		const answerClassName = isAnswer 
			? `${correctOption === index ? 'correct' : 'wrong'}` 
			: '';

		const optionClassName = `btn-option ${answerClassName}`;
		return (
			<Button
				key={index}
				className={optionClassName}
				onClick={() => onCorrectAnswer(index)}
				disabled={isAnswer}
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