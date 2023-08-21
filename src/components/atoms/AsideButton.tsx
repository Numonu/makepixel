import { ReactNode } from "react";

type AsideButtonTypes = {
	icon: ReactNode;
	value: string;
	focus: string;
	focusIcon?: ReactNode;
	onClick: (value: string) => void;
};
export default function AsideButton({
	value,
	icon,
	focusIcon,
	focus,
	onClick,
}: AsideButtonTypes) {

	const SELECTED = focus === value;

	return (
		<button
			className={`w-full pl-2 pr-8 py-2 flex items-center gap-2 text-2xl rounded-lg hover:bg-neutral-100 ${SELECTED && "bg-neutral-200 hover:bg-neutral-200"} `}
			onClick={() => onClick(value)}
		>
			{SELECTED ? focusIcon : icon}
			<span className="text-lg capitalize">{value}</span>
		</button>
	);
}
