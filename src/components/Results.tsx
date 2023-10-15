import { useQuiz } from "../context/useQuiz";
import { ActionType } from "../types";

import Button from "./Button";

function Results () {
	const {
		allPoints,
		score,
		highScore,
		dispatch
	} = useQuiz();

	let emoji;
	const scoreString = `You scored ${score} out of ${allPoints}`;
	const persents = Math.round(score * 100 / allPoints);

	if(persents === 100) emoji = '🎖️';
	if(persents >= 80 && persents < 100) emoji = '🎉';
	if(persents >= 50 && persents < 80) emoji = '👍';
	if(persents >= 0 && persents < 50) emoji = '🤔';
	if(persents === 0) emoji = '🤦';

	const resultsString = ` ${scoreString} (${persents}%)`;

	function handleRestart () {
		dispatch({ type: ActionType.RESTART });
	}

	return (
		<>
			<p className="result">
				{emoji}{resultsString}    
			</p>
			<p className="highscore">
                Highscore: {highScore} points
			</p>
			<Button
				className="btn-ui"
				onClick={handleRestart}
			>
                Restart quiz
			</Button>
		</>
	);
}

export default Results;