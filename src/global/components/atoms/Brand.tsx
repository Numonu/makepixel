import { Link } from "react-router-dom";

type BrandTypes = {
	className?: string;
};

export default function Brand({ className }: BrandTypes) {
	return (
		<Link className={`flex items-center gap-2 ${className}`} to={"/"}>
			<img
				className="w-9"
				src="images/pixelcrafters_icon.png"
				style={{ imageRendering: "pixelated" }}
			/>
			<span className="hidden text-2xl sm:block capitalize">
				Spritecrafters
			</span>
		</Link>
	);
}
