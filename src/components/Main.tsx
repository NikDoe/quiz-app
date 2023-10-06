import { ReactNode } from "react";

type MainProps = {
	children: ReactNode;
}

function Main (props: MainProps) {
	const {
		children
	} = props;

	return (
		<main className="main">
			{children}
		</main>
	);
}

export default Main;