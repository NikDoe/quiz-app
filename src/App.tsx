import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartContent from "./components/StartContent";
import { QuizStatus, TState, TAction, ActionType } from "./types";

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
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { questions } = state;

	function handleStart () {
		console.log('start quiz');
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
	
	return (
		<div className="app">
			<Header />
			<Main>
				<StartContent 
					quizLength={questions.length}
					onStart={handleStart}
				/>
			</Main>
		</div>
	);
}

export default App;
