type QuizHeaderProps = {
	quizLength: number;
	index: number;
}

function QuizHeader (props: QuizHeaderProps) {
	const {
		quizLength,
		index
	} = props;

	return (
		<header className="progress">
			<progress value="0" max={quizLength}></progress>
			<p>Question {index + 1} / {quizLength}</p>
			<p>0 / 280</p>
		</header>
	);
}

export default QuizHeader;