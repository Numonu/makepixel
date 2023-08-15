import { useState } from "react";

type RangeTypes = {
	min?: number;
	max?: number;
	onChange: (value: number) => void;
};
export default function Range({ min = 1, max = 10, onChange }: RangeTypes) {
	const [value, setValue] = useState(0);

	const updateValue = (newValue: string) => {
		const VALUE = Number(newValue);
		//
		onChange(VALUE);
		setValue(VALUE);
	};

	return (
		<div className="flex items-center">
			<input
				className="accent-sky-300"
				type="range"
				value={value}
				min={min}
				max={max}
				onChange={(e) => updateValue(e.target.value)}
			/>
			<span className="text-neutral-700">{value}</span>
		</div>
	);
}
