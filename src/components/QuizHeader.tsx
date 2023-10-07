type QuizHeaderProps = {
	quizLength: number;
	index: number;
	answer: number | null;
	score: number;
	allPoints: number;
}

function QuizHeader (props: QuizHeaderProps) {
	const {
		quizLength,
		index,
		answer,
		score,
		allPoints
	} = props;

	return (
		<header className="progress">
			<progress value={index + Number(answer !== null)} max={quizLength}></progress>
			<p>Question {index + 1} / {quizLength}</p>
			<p>{score} / {allPoints}</p>
		</header>
	);
}

export default QuizHeader;