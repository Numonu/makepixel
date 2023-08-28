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
	value,
	filter,
	icon,
	tag,
	focusIcon,
}: FilterButtonTypes) {
	const SELECTED = filter === value;
	const redirect = tag ? `/gallery/${value}/${tag}` : `/gallery/${value}`;

	return (
		<Link
			to={redirect}
			className={`w-full pl-2 pr-8 py-2 flex items-center gap-2 text-2xl rounded-lg hover:bg-neutral-100 ${
				SELECTED && "bg-neutral-200 hover:bg-neutral-200"
			} `}
		>
			{SELECTED ? focusIcon : icon}
			<span className="text-lg capitalize">{value}</span>
		</Link>
	);
}
