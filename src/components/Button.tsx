import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
	className?: string;
	onClick?: () => void;
	disabled? : boolean;
}

function Button (props: ButtonProps) {
	const {
		className = "",
		children,
		onClick,
		disabled
	} = props;

	const classNameString = `btn ${className}`;
    
	return (
		<button 
			className={classNameString}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;