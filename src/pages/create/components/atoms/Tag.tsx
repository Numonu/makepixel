type TagTypes = {
	color: string;
	value: string;
	onClick: (value: string) => void;
	selected?: boolean;
};

export default function Tag({ color, value, selected, onClick }: TagTypes) {
	if (selected) {
		return (
			<button
				type="button"
				className="bg-transparent border-sky-400 text-neutral-700 w-min py-2 px-3 flex gap-1 items-center rounded-full border"
				onClick={() => onClick(value)}
			>
				<div
					className="bg-sky-400 w-3 aspect-square rounded-full"
				></div>
				<span className="capitalize text-xs">{value}</span>
			</button>
		);
	}
	return (
		<button
			type="button"
			className="bg-transparent border-neutral-200 text-neutral-700 w-min py-2 px-3 flex gap-1 items-center rounded-full border"
			onClick={() => onClick(value)}
		>
			<div
				className="w-3 aspect-square rounded-full"
				style={{ backgroundColor: color }}
			></div>
			<span className="capitalize text-xs">{value}</span>
		</button>
	);
}
