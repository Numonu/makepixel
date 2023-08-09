import {useContext} from "react";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsEraser } from "react-icons/bs";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import {MdInvertColors} from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import ToolButton from "./ToolButton";
import { DrawContextTypes, drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";
import { requireDependencies } from "../../global/utilities/errorHandlers";

export default function PaintToolBar() {
	requireDependencies(drawContext);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	return (
		<aside className="flex flex-row gap-6 lg:flex-col">
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolButton selected={draw!.currentTool == Tool.Brush}>
					<HiOutlinePaintBrush />
				</ToolButton>
				<ToolButton selected={draw!.currentTool == Tool.Picker}>
					<MdInvertColors/>
				</ToolButton>
				<ToolButton selected={draw!.currentTool == Tool.Eraser}>
					<BsEraser />
				</ToolButton>
			</div>
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolButton>
					<TfiBackLeft />
				</ToolButton>
				<ToolButton>
					<TfiBackRight />
				</ToolButton>
			</div>
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolButton>
					<MdFileDownload />
				</ToolButton>
			</div>
		</aside>
	);
}
