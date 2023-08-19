import { Link } from "react-router-dom";

export default function Brand() {
	return (
		<Link className="flex items-center gap-2" to={"/"}>
			<span className="text-red-500 text-3xl">
				<img
					className="w-9"
					src="images/pixelcrafters_icon.png"
					style={{ imageRendering: "pixelated" }}
				/>
			</span>
			<span className="hidden text-2xl sm:block capitalize">Pixelcrafters</span>
		</Link>
	);
}
