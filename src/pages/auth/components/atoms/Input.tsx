import { useState } from "react";

type InputTypes = {
	placeholder: string;
	type?: string;
};

export default function Input({ type = "text", placeholder }: InputTypes) {
	const [focus, setFocus] = useState(false);

	const on = () => setFocus(true);
	const off = () => setFocus(false);

	return (
		<label
			className={`text-neutral-700 pb-1 px-2 flex gap-4 border-b transition-colors ${
				focus && "border-primary"
			}`}
			htmlFor={placeholder + "_"}
			onFocus={on}
			onBlur={off}
		>
			<span
				className={`capitalize transition-colors ${
					focus && "text-primary"
				}`}
			>
				{placeholder}
			</span>
			<input
				className="text-title grow outline-none text-base"
				id={placeholder + "_"}
				type={type}
			/>
		</label>
	);
}
