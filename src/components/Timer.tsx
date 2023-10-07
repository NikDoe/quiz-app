import { Dispatch, useEffect } from "react";
import { ActionType, TAction } from "../types";

type TimerProps = {
    secondsRemaining: number;
    dispatch: Dispatch<TAction>;
}

function Timer (props: TimerProps) {
	const {
		secondsRemaining,
		dispatch
	} = props;

	useEffect(() => {
		const interval = setInterval(() => {
			if (secondsRemaining > 0) {
				dispatch({ type: ActionType.SETTIMER });
			} else {
				clearInterval(interval);
				dispatch({ type: ActionType.SETHIGHSCORE });
				dispatch({ type: ActionType.FINISH });
			}
		}, 1000);
    
		return () => clearInterval(interval);
	}, [secondsRemaining, dispatch]);

	const minutes = Math.floor(secondsRemaining / 60);
	const seconds = (secondsRemaining % 60).toString().padStart(2, '0');

	return (
		<div className="timer">
			{minutes && minutes}:
			{seconds}
		</div>
	);
}

export default Timer;