import { Dispatch } from "react";
import Button from "./Button";
import { ActionType, TAction } from "../types";

type ResultsProps = {
	dispatch: Dispatch<TAction>;
	score: number;
	highScore: number;
	allPoints: number;
}

function Results (props: ResultsProps) {
	const {
		dispatch,
		score,
		highScore,
		allPoints
	} = props;

	const emoji = <span>👽</span>;
	const scoreString = `You scored ${score} out of ${allPoints}`;
	const persents = `(${Math.round(score * 100 / allPoints)}%)`;

	const resultsString = ` ${scoreString} ${persents}`;

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