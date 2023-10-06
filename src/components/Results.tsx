import Button from "./Button";

function Results () {
	const emoji = <span>👽</span>;
	const score = `You scored 0 out of 280`;
	const persents = `(0%)`;

	const resultsString = `${emoji} ${score} ${persents}`;

	return (
		<>
			<p className="result">
				{resultsString}    
			</p>
			<p className="highscore">
                Highscore: 0 points
			</p>
			<Button
				className="btn-ui"
			>
                Restart quiz
			</Button>
		</>
	);
}

export default Results;