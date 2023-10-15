import { ReactNode, useEffect, useReducer } from "react";
import { QuizContext, initialState } from "./QuizContext";
import { ActionType, QuizStatus, TAction, TContextValue, TState } from "../types";

type QuizProviderProps = {
    children: ReactNode;
}

const SECONDS_PER_QUESTION = 60;

function reducer (state: TState, action: TAction): TState {
	switch (action.type) {
		case ActionType.DATARECEIVED:
			return {
				...state,
				status: QuizStatus.READY,
				questions: action.payload
				
			};
		case ActionType.DATAFAILED:
			return {
				...state,
				status: QuizStatus.ERROR
			};
		case ActionType.START:
			return {
				...state,
				status: QuizStatus.ACTIVE,
				secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
			};
		case ActionType.SETANSWER: {
			const { 
				correctOption,
				points
			} = state.questions[state.index];

			const score = action.payload === correctOption 
				? state.score + points 
				: state.score;
			
			return {
				...state,
				answer: action.payload,
				score 
			};
		}
		case ActionType.NEXTQUESTION:
			return {
				...state,
				index: state.index + 1,
				answer: null
			};
		case ActionType.SETTIMER:
			return {
				...state,
				secondsRemaining: state.secondsRemaining -1
			};
		case ActionType.FINISH:
			return {
				...state,
				status: QuizStatus.FINISH,
				highScore: state.highScore > state.score 
					? state.highScore 
					: state.score
			};
		case ActionType.RESTART:
			return {
				...initialState,
				questions: state.questions,
				status: QuizStatus.READY,
			};
		default:
			return state;
	}
}

function QuizProvider({ children }: QuizProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { 
		questions,
		status,
		index,
		score,
		highScore,
		answer,
		secondsRemaining
	} = state;

	useEffect(function(){
		async function fetchQuestions() {
			try {
				const response = await fetch('http://localhost:9000/questions');
				const data = await response.json();
				
				dispatch({ type: ActionType.DATARECEIVED, payload: data });
			} catch (error) {
				dispatch({ type: ActionType.DATAFAILED });
			}
		}

		fetchQuestions();
	}, []);

	const allPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
    
	const value: TContextValue = {
		questions,
		status,
		index,
		score,
		highScore,
		answer,
		secondsRemaining,
		allPoints,
		dispatch,
	};

	return (
		<QuizContext.Provider
			value={value}
		>
			{children}
		</QuizContext.Provider>
	);
}

export default QuizProvider;
