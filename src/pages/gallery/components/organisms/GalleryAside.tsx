import { useParams } from "react-router-dom";
import { DRAW_TAGS } from "../../../../global/constants/draw";
import { asideFilters } from "../../constants/asideFilters";
import FilterButton from "../atoms/FilterButton";
import TagButton from "../atoms/TagButton";

export default function GalleryAside() {

	const {filter , tag} = useParams();

	return (
		<aside className="bg-white h-min lg:sticky lg:top-20">
			<div className="bg-white border-t w-full py-4 fixed bottom-0 flex justify-evenly gap-4 lg:static lg:flex-col">
				{asideFilters.map((e) => {
					return (
						<FilterButton
							key={e.value}
							icon={e.icon}
							focusIcon={e.focusIcon}
							value={e.value}
							tag={tag}
							filter={filter}
						/>
					);
				})}
			</div>
			<hr className="hidden my-2" />
			<div className="flex flex-wrap gap-1 lg:flex-col">
				<TagButton value={"all"} to={`/gallery/${filter}`} selected={tag == undefined} filter={filter} tag={tag} />
				{DRAW_TAGS.map((e) => {
					return <TagButton key={e} value={e} filter={filter} tag={tag} />;
				})}
			</div>
		</aside>
	);
}
