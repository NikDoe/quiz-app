type QuizHeaderProps = {
	quizLength: number;
	index: number;
	progress: number;
	score: number;
	allPoints: number;
}

function QuizHeader (props: QuizHeaderProps) {
	const {
		quizLength,
		index,
		progress,
		score,
		allPoints
	} = props;

	return (
		<header className="progress">
			<progress value={progress} max={quizLength}></progress>
			<p>Question {index + 1} / {quizLength}</p>
			<p>{score} / {allPoints}</p>
		</header>
	);
}

export default QuizHeader;