import { useState, ReactNode } from "react";

type InputLinkTypes = {
	icon: ReactNode;
	placeholder: string;
	required?: boolean;
	type?: string;
	value?: string;
	onChange: (value: string) => void;
};

export default function InputLink({
	icon,
	placeholder,
	onChange,
	value,
	type = "text",
	required = true,
}: InputLinkTypes) {
	const [focus, setFocus] = useState(false);

	const on = () => setFocus(true);
	const off = () => setFocus(false);

	return (
		<label
			className={`text-neutral-700 mb-1 pb-1 px-2 flex items-center gap-4 border-b transition-colors ${
				focus && "border-primary"
			}`}
			onFocus={on}
			onBlur={off}
			htmlFor={placeholder + "_"}
		>
            <span className={`transition-colors ${focus && "text-primary"}`}>{icon}</span>
			<span className={`transition-colors ${focus && "text-primary"}`}>
				{placeholder}
			</span>
			<input
				className="text-title min-w-0 grow outline-none text-base"
				type={type}
				value={value}
				required={required}
				id={placeholder + "_"}
				onChange={(e) => onChange(e.target.value)}
			/>
		</label>
	);
}
