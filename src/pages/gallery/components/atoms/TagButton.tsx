import { Link } from "react-router-dom";
import { galleryParamTypes } from "../../constants/types";

type TagButtonTypes = {
	value: string;
	filter: galleryParamTypes;
	tag: galleryParamTypes;
	to?: string;
	selected?:boolean;
};
export default function TagButton({ filter, tag, value, to , selected }: TagButtonTypes) {
	const SELECTED = selected ?? tag === value;
	let redirect: string;

	if (to) redirect = to;
	else {
		redirect = filter
			? `/gallery/${filter}/${value}`
			: `/gallery/new/${value}`;
	}

	return (
		<Link
			to={redirect}
			className={`w-full py-2 px-4 text-sm text-start capitalize opacity-80 rounded-full hover:bg-neutral-100 ${
				SELECTED && "bg-neutral-200 hover:bg-neutral-200"
			}`}
		>
			{value}
		</Link>
	);
}
