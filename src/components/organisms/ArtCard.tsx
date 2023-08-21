import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function ArtCard() {
	return (
		<article>
			<img
				className="w-full aspect-square mb-4"
				src="https://cdn.pixabay.com/photo/2023/08/10/20/10/shark-8182315_960_720.jpg"
				alt="imagen de ejemplo"
				style={{ imageRendering: "pixelated" }}
			/>
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<button className="border-neutral-300 py-1 px-2 flex gap-2 items-center border rounded-lg active:scale-90 hover:text-sky-500 hover:border-sky-500 transition-transform">
						<span className="text-lg">
							<AiOutlineLike />
						</span>
						<span>123</span>
					</button>
					<Link to={"/gallery/123"} className="border-neutral-300 p-2 flex gap-2 items-center border rounded-lg text-lg active:scale-90 hover:text-sky-500 hover:border-sky-500 transition-transform">
						<LiaCommentSolid />
					</Link>
				</div>
				<Link
					to={"/"}
					className="text-sm hover:text-sky-500"
				>
					@Felipix
				</Link>
			</div>
		</article>
	);
}
