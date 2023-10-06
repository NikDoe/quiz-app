import { Tquestion } from "../types";
import Options from "./Options";

type QuizProps = {
	currentQuestion: Tquestion;
}

function Quiz ({ currentQuestion }: QuizProps) {
	const {
		question,
		options
	} = currentQuestion;

	return(
		<div>
			<h4>{question}</h4>
			<Options options={options} />
		</div>
	);
}

export default Quiz;