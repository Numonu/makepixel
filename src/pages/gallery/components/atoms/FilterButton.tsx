import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { galleryParamTypes } from "../../constants/types";

type FilterButtonTypes = {
	icon: ReactNode;
	value: string;
	filter: galleryParamTypes;
	tag: galleryParamTypes;
	focusIcon?: ReactNode;
};
export default function FilterButton({
	filter = "new",
	value,
	icon,
	tag,
	focusIcon,
}: FilterButtonTypes) {
	const SELECTED = filter === value;
	const redirect = tag ? `/gallery/${value}/${tag}` : `/gallery/${value}`;

	return (
		<Link
			to={redirect}
			className={`w-1/4 py-2 px-4 max-w-[100px] flex flex-col items-center gap-2 text-xl rounded-lg hover:bg-neutral-100 lg:flex-row lg:max-w-none lg:w-full lg:text-2xl ${
				SELECTED && "bg-neutral-200 hover:bg-neutral-200"
			} `}
		>
			<span className="shrink-0">
				{SELECTED ? focusIcon : icon}
			</span>
			<span className="text-sm capitalize lg:text-lg">{value}</span>
		</Link>
	);
}
