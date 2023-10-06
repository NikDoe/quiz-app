import { useState } from "react";
import StartContent from "./StartContent";
import QuizContent from "./QuizContent";

import { questions } from '../questions.json';

export type Tquestion = typeof questions[number];

function Main () {
	const [isStart, setIsStart] = useState<boolean>(false);

	return (
		<main className="main">
			{isStart 
				? <QuizContent
					questions={questions}
				/> 
				: <StartContent 
					quizLength={questions.length}
					onStart={setIsStart}
				/>
			}
		</main>
	);
}

export default Main;