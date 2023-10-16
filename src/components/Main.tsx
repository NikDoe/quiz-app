import { useEffect } from "react";
import { useQuiz } from "../context/useQuiz";
import { QuizStatus } from "../types";

import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import QuizContent from "./QuizContent";
import Results from "./Results";
import StartContent from "./StartContent";

function Main () {
	const { status, fetchQuestions } = useQuiz();

	useEffect(function(){
		fetchQuestions();
	}, [fetchQuestions]);

	return (
		<main className="main">
			{status === QuizStatus.LOADING && <Loader />}
			{status === QuizStatus.ERROR && <ErrorMessage />}
			{status === QuizStatus.READY && <StartContent />}
			{status === QuizStatus.ACTIVE && <QuizContent />}
			{status === QuizStatus.FINISH && <Results />}
		</main>
	);
}

export default Main;