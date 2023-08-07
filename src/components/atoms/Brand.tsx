import { AiFillHeart } from "react-icons/ai";

export default function Brand() {
	return (
		<div className="flex gap-2">
			<span className="text-red-500 text-3xl">
				<AiFillHeart />
			</span>
			<span className="hidden text-2xl sm:block">Pixelcrafters</span>
		</div>
	);
}
