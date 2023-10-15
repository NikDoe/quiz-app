import { useQuiz } from "../context/useQuiz";

function QuizHeader () {
	const {
		allPoints,
		questions,
		index,
		answer,
		score
	} = useQuiz();

	return (
		<header className="progress">
			<progress value={index + Number(answer !== null)} max={questions.length}></progress>
			<p>Question {index + 1} / {questions.length}</p>
			<p>{score} / {allPoints}</p>
		</header>
	);
}

export default QuizHeader;