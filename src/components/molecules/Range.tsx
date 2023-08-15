type RangeTypes = {
	current: number;
	min?: number;
	max?: number;
	onChange: (value: number) => void;
};
export default function Range({
	min = 1,
	max = 10,
	current,
	onChange,
}: RangeTypes) {
	const updateValue = (newValue: string) => {
		const VALUE = Number(newValue);
		onChange(VALUE);
	};

	return (
		<div className="flex items-center">
			<input
				className="accent-sky-300"
				type="range"
				value={current}
				min={min}
				max={max}
				onChange={(e) => updateValue(e.target.value)}
			/>
			<span className="text-neutral-700">{current}</span>
		</div>
	);
}
