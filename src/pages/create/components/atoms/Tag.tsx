type TagTypes = {
	value: string;
	selected?: boolean;
	onClick: (value: string) => void;
};

export default function Tag({ value, selected, onClick }: TagTypes) {
	return (
		<button
			type="button"
			className={`bg-transparent text-neutral-700 w-min py-2 px-3 flex gap-1 items-center rounded-full border ${
				selected ? "border-sky-400" : "border-neutral-200"
			}`}
			onClick={() => onClick(value)}
		>
			<div
				className={`w-3 aspect-square rounded-full ${
					selected ? "bg-sky-400" : "bg-neutral-600"
				}`}
			></div>
			<span className="capitalize text-xs">{value}</span>
		</button>
	);
}
