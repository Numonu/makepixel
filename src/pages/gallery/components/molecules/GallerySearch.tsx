import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";

export default function GallerySearch() {
	const location = useLocation();
	const INVISIBLE = location.pathname !== "/";
	return (
		<div
			className={`border-neutral-500 grow py-1 px-2 border flex gap-2 items-center rounded-full 
			${INVISIBLE && "opacity-0"}`}
		>
			<span className="text-neutral-500">
				<BsSearch />
			</span>
			<input
				className="grow bg-transparent outline-none"
				type="text"
				placeholder="Search Pixelarts"
			/>
		</div>
	);
}
