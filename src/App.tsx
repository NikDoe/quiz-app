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
import Results from "./components/Results";

const initialState: TState = {
	questions: [],
	status: QuizStatus.LOADING,
	index: 0,
	progress: 0,
	score: 0,
	highScore: 0,
	isAnswer: false,
	secondsRemaining: 10
};

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
				
			};
		case ActionType.SETANSWER:
			return {
				...state,
				isAnswer: action.payload,
			};
		case ActionType.SETPROGERSS:
			return {
				...state,
				progress: state.progress + 1
			};
		case ActionType.SETSCORE:
			return {
				...state,
				score: state.score + action.payload
			};
		case ActionType.SETHIGHSCORE:
			return {
				...state,
				highScore: state.highScore > state.score 
					? state.highScore 
					: state.score
			};
		case ActionType.NEXTQUESTION:
			return {
				...state,
				index: state.index + 1
			};
		case ActionType.SETTIMER:
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1
			};
		case ActionType.FINISH:
			return {
				...state,
				status: QuizStatus.FINISH
			};
		case ActionType.RESTART:
			return {
				...state,
				status: QuizStatus.READY,
				index: 0,
				progress: 0,
				score: 0,
				isAnswer: false,
				secondsRemaining: 10
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
		progress,
		score,
		highScore,
		isAnswer,
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
		<QuizContent>
			<QuizHeader 
				quizLength={quizLength}
				index={index}
				progress={progress}
				score={score}
				allPoints={allPoints}
			/>
			<Quiz 
				currentQuestion={questions[index]} 
				dispatch={dispatch}
				isAnswer={isAnswer}
			/>
			<QuizFooter 
				dispatch={dispatch}
				isAnswer={isAnswer}
				isQuizFinished={quizLength === progress}
				secondsRemaining={secondsRemaining}
			/>
		</QuizContent>
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
