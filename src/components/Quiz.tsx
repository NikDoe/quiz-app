import { useQuiz } from "../context/useQuiz";

import Options from "./Options";

function Quiz () {
	const { questions, index } = useQuiz();
	const { question } = questions[index];

	return(
		<div>
			<h4>{question}</h4>
			<Options />
		</div>
	);
}

export default Quiz;