import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import { TContextValue } from "../types";

export function useQuiz (): TContextValue {
	const context = useContext(QuizContext);

	if(context === undefined) {
		throw new Error('attempt to use context outside of provider');
	}

	return context;
}