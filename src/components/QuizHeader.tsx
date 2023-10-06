type QuizHeaderProps = {
	quizLength: number;
}

function QuizHeader (props: QuizHeaderProps) {
	const {
		quizLength
	} = props;

	return (
		<header className="progress">
			<progress value="0" max={quizLength}></progress>
			<p>Question 1 / {quizLength}</p>
			<p>0 / 280</p>
		</header>
	);
}

export default QuizHeader;