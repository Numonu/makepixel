import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";

type PasswordInputTypes = {
	placeholder: string;
	error: string;
	type?: string;
	onChange: (value: string) => void;
};

export default function PasswordInput({
	placeholder,
	error,
	onChange,
}: PasswordInputTypes) {
	const [reveal, setReveal] = useState(false);
	const [focus, setFocus] = useState(false);

	const on = () => setFocus(true);
	const off = () => setFocus(false);

	const toggleReveal = () => setReveal(!reveal);

	return (
		<div>
			<div
				className={`text-neutral-700 mb-1 pb-1 px-2 flex gap-4 border-b transition-colors ${
					focus && "border-primary"
				}`}
				onFocus={on}
				onBlur={off}
			>
				<label
					className={`capitalize transition-colors ${
						focus && "text-primary"
					}`}
					htmlFor={placeholder + "_"}
				>
					{placeholder}
				</label>
				<input
					className="text-title min-w-0 grow outline-none text-base"
					required
					type={reveal ? "text" : "password"}
					id={placeholder + "_"}
					onChange={(e) => onChange(e.target.value)}
				/>
				<button
					className="p-1 rounded-full text-xl hover:bg-hover"
					type="button"
					onClick={toggleReveal}
				>
					{reveal ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
				</button>
			</div>
			<span
				className={`text-red-500 flex gap-1 items-center lowercase ${
					!error && "opacity-0"
				}`}
			>
				<span className="text-lg">
					<PiSealWarningBold />
				</span>
				<span className="text-sm">{error}</span>
			</span>
		</div>
	);
}
