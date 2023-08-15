import { useContext } from "react";
import { HexColorPicker } from "react-colorful";
import CopyButton from "../molecules/CopyButton";
import { drawContext } from "../../global/context/drawContext";

export default function BrushOptions() {
	const draw = useContext(drawContext);

	const updateColor = (newColor: string) => {
		draw!.color.update(newColor);
	};

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h2 className="text-neutral-700 mb-2">Color</h2>
				<div className="bg-neutral-100 border-neutral-100 w-[200px] mb-2 p-1 pl-2 border rounded-md flex items-center gap-1">
					<span className="text-neutral-500 text-xl">#</span>
					<input
						value={draw!.color.current.replace("#", "")}
						className="bg-transparent min-w-0 outline-none tracking-widest"
						type="text"
					/>
					<CopyButton target={draw!.color.current} />
				</div>
				<HexColorPicker
					color={draw!.color.current}
					onChange={(e) => updateColor(e)}
				/>
			</div>
		</div>
	);
}
