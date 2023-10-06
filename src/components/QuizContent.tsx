import { ReactNode } from "react";

type QuizContentProps = {
	children: ReactNode;
}

function QuizContent ({ children }: QuizContentProps) {
	return (
		<>
			{children}
		</>
	);
}

export default QuizContent;