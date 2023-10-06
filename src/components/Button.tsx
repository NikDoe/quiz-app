import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
	className?: string;
	onClick?: () => void;
}

function Button (props: ButtonProps) {
	const {
		className = "",
		children,
		onClick
	} = props;

	const classNameString = `btn ${className}`;
    
	return (
		<button 
			className={classNameString}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;