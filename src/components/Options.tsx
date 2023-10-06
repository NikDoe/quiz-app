import Button from "./Button";

type OptionsProps = {
    options: string[];
}

function Options ({ options } : OptionsProps) {

	const optionsArray = options.map((option, index) => (
		<Button
			key={index}
			className="btn-option"
		>
			{option}
		</Button>
	));

	return (
		<div className="options">
			{optionsArray}
		</div>
	);
}

export default Options;