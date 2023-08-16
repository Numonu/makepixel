export default function Brand() {
	return (
		<div className="flex items-center gap-2">
			<span className="text-red-500 text-3xl">
				<img
					className="w-9"
					src="images/pixelcrafters_icon.png"
					style={{ imageRendering: "pixelated" }}
				/>
			</span>
			<span className="hidden text-2xl sm:block">Pixelcrafters</span>
		</div>
	);
}
