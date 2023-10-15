import { createContext } from "react";
import { QuizStatus, TContextValue, TState } from "../types";

export const initialState: TState = {
	questions: [],
	status: QuizStatus.LOADING,
	index: 0,
	score: 0,
	highScore: 0,
	answer: null,
	secondsRemaining: 0,
};

const quizContextValue: TContextValue = {
	...initialState,
	allPoints: 0,
	dispatch: () => {},
};

export const QuizContext = createContext(quizContextValue);