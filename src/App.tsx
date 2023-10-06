import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartContent from "./components/StartContent";
import { QuizStatus, TState, TAction, ActionType } from "./types";
import Loader from "./components/Loader";
import Error from "./components/Error";
import QuizContent from "./components/QuizContent";

const initialState = {
	questions: [],
	status: QuizStatus.LOADING
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
				status: QuizStatus.ACTIVE
			};
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { questions, status } = state;

	function handleStart () {
		dispatch({ type: ActionType.START });
	}

	useEffect(function() {
		async function fetchQuestions() {
			try {
				const response = await fetch('http://localhost:9000/questions');
				const data = await response.json();

				console.log(data);
				
				dispatch({ type: ActionType.DATARECEIVED, payload: data });
			} catch (error) {
				dispatch({ type: ActionType.DATAFAILED });
			}
		}

		fetchQuestions();
	}, []);

	const startContent = (
		<StartContent 
			quizLength={questions.length}
			onStart={handleStart}
		/>
	);

	const quizContent = (
		<QuizContent
			questions={questions} 
		/>
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
