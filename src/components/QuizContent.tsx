import { Tquestion } from "./Main";
import Quiz from "./Quiz";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";

type QuizContentProps = {
	questions: Tquestion[];
}

function QuizContent (props: QuizContentProps) {
	const { questions } = props;

	return (
		<>
			<QuizHeader quizLength={questions.length} />
			<Quiz />
			<QuizFooter />
		</>
	);
}

export default QuizContent;