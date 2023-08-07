import { BsSearch } from "react-icons/bs";

export default function GallerySearch() {
	return (
		<div className="border-neutral-500 grow py-1 px-2 border flex gap-2 items-center rounded-full">
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
