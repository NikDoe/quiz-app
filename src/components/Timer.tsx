import { useEffect } from "react";
import { ActionType } from "../types";
import { useQuiz } from "../context/useQuiz";

function Timer () {
	const {
		dispatch,
		secondsRemaining
	} = useQuiz();

	useEffect(() => {
		const interval = setInterval(() => {
			if (secondsRemaining > 0) {
				dispatch({ type: ActionType.SETTIMER });
			} else {
				clearInterval(interval);
				dispatch({ type: ActionType.FINISH });
			}
		}, 1000);
    
		return () => clearInterval(interval);
	}, [secondsRemaining, dispatch]);

	const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, '0');
	const seconds = (secondsRemaining % 60).toString().padStart(2, '0');

	return (
		<div className="timer">
			{minutes && minutes}:
			{seconds}
		</div>
	);
}

export default Timer;