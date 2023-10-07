import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartContent from "./components/StartContent";
import { QuizStatus, TState, TAction, ActionType } from "./types";
import Loader from "./components/Loader";
import Error from "./components/Error";
import QuizHeader from "./components/QuizHeader";
import Quiz from "./components/Quiz";
import QuizFooter from "./components/QuizFooter";
import Results from "./components/Results";

const initialState: TState = {
	questions: [],
	status: QuizStatus.LOADING,
	index: 0,
	score: 0,
	highScore: 0,
	answer: null,
	secondsRemaining: 0
};

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

function App() {
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

	const quizLength = questions.length;

	const allPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

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
			dispatch={dispatch}
		/>
	);

	const quizContent = (
		<>
			<QuizHeader 
				quizLength={quizLength}
				index={index}
				answer={answer}
				score={score}
				allPoints={allPoints}
			/>
			<Quiz 
				currentQuestion={questions[index]} 
				dispatch={dispatch}
				answer={answer}
			/>
			<QuizFooter 
				dispatch={dispatch}
				answer={answer}
				isQuizFinished={quizLength === index + 1}
				secondsRemaining={secondsRemaining}
			/>
		</>
	);

	const resultsContent = (
		<Results 
			dispatch={dispatch} 
			score={score}
			highScore={highScore}
			allPoints={allPoints}
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
				{status === QuizStatus.FINISH && resultsContent}
			</Main>
		</div>
	);
}

export default App;
