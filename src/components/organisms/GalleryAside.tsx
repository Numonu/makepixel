import AsideButton from "../atoms/AsideButton";
import { useState } from "react";
import { DRAW_TAGS } from "../../global/constant/DrawConstant";
import { asideFilters } from "../../constants/asideFilters";
export default function GalleryAside() {

	const [primaryFilter, setPrimaryFilter] = useState("new");
	const [secondaryFilter, setSecondaryFilter] = useState("other");

	const updatePrimaryFilter = (newSelected: string) => {
		setPrimaryFilter(newSelected);
	};
	const updateSecondaryFilter = (newSelected: string) => {
		setSecondaryFilter(newSelected);
	};

	return (
		<aside className="h-min sticky top-20">
			<div className="flex flex-col gap-1">
				{asideFilters.map((e) => {
					return (
						<AsideButton
							icon={e.icon}
							focusIcon={e.focusIcon}
							focus={primaryFilter}
							value={e.value}
							onClick={updatePrimaryFilter}
						/>
					);
				})}
			</div>
			<hr className="my-2" />
			<div className="flex flex-col gap-1">
				{DRAW_TAGS.map((e) => {
					return (
						<button
							className={`w-full py-2 px-4 text-sm text-start capitalize opacity-80 rounded-full hover:bg-neutral-100 ${
								e === secondaryFilter && "bg-neutral-200 hover:bg-neutral-200"
							}`}
							onClick={() => updateSecondaryFilter(e)}
						>
							{e}
						</button>
					);
				})}
			</div>
		</aside>
	);
}
