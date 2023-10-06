import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartContent from "./components/StartContent";
import { QuizStatus, TState, TAction, ActionType } from "./types";
import Loader from "./components/Loader";
import Error from "./components/Error";
import QuizContent from "./components/QuizContent";
import QuizHeader from "./components/QuizHeader";
import Quiz from "./components/Quiz";
import QuizFooter from "./components/QuizFooter";

const initialState: TState = {
	questions: [],
	status: QuizStatus.LOADING,
	index: 0
};

function reducer (state: TState, action: TAction): TState {
	switch (action.type) {
		case ActionType.DATARECEIVED:
			return {
				...state,
				status: QuizStatus.READY,
				questions: action.payload || []
				
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
				
			};
		case ActionType.NEXTQUESTION:
			return {
				...state,
				index: state.index < 15 ? state.index + 1 : state.index
			};
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { 
		questions,
		status,
		index
	} = state;

	const quizLength = questions.length;

	function handleStart () {
		dispatch({ type: ActionType.START });
	}

	useEffect(function() {
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

	const startContent = (
		<StartContent 
			quizLength={quizLength}
			onStart={handleStart}
		/>
	);

	const quizContent = (
		<QuizContent>
			<QuizHeader 
				quizLength={quizLength}
				index={index}
			/>
			<Quiz currentQuestion={questions[index]} />
			<QuizFooter dispatch={dispatch} />
		</QuizContent>
	);
	
	return (
		<div className="app">
			<Header />
			<Main>
				{status === QuizStatus.LOADING && <Loader />}
				{status === QuizStatus.ERROR && <Error />}
				{status === QuizStatus.READY && startContent}
				{status === QuizStatus.ACTIVE && quizContent}
			</Main>
		</div>
	);
}

export default App;
