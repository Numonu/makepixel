import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import Soul from "../../../../global/components/atoms/Soul";

export default function ArtCardSoul() {
	return (
		<article className="max-w-full">
			<Soul className="w-full aspect-square mb-4" />
			<div className="w-full flex gap-6 justify-between items-center">
				<div className="flex gap-2">
					<Soul className="text-transparent p-2 flex gap-2 rounded-lg">
						<AiOutlineLike />
						<span className="text-sm hidden min-[450px]:block">
							00
						</span>
					</Soul>
					<Soul className="text-transparent p-2 flex gap-2 rounded-lg">
						<AiOutlineHeart />
					</Soul>
				</div>
				<span></span>
			</div>
		</article>
	);
}
