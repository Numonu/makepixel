import { useParams } from "react-router-dom";
import { DRAW_TAGS } from "../../../../global/constants/draw";
import { asideFilters } from "../../constants/asideFilters";
import FilterButton from "../atoms/FilterButton";
import TagButton from "../atoms/TagButton";

export default function GalleryAside() {

	const {filter , tag} = useParams();

	return (
		<aside className="h-min sticky top-20">
			<div className="flex flex-col gap-1">
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
			<hr className="my-2" />
			<div className="flex flex-col gap-1">
				<TagButton value={"all"} to={`/gallery/${filter}`} selected={tag == undefined} filter={filter} tag={tag} />
				{DRAW_TAGS.map((e) => {
					return <TagButton key={e} value={e} filter={filter} tag={tag} />;
				})}
			</div>
		</aside>
	);
}
