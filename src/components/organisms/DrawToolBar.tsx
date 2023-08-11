import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsEraser } from "react-icons/bs";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdInvertColors } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { BsGrid3X3 } from "react-icons/bs";
import ToolButton from "../atoms/ToolButton";
import { Tool } from "../../global/enums/drawEnums";
import ToolTip from "../atoms/ToolTip";
import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";
import { requireDependencies } from "../../global/utilities/errorHandlers";

export default function PaintToolBar() {
	requireDependencies(drawContext);
	const draw = useContext(drawContext);
	return (
		<aside className="flex flex-row gap-6 lg:flex-col">
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolTip tip="Brush" keycode="b">
					<ToolButton.ToolSetter toolValue={Tool.Brush}>
						<HiOutlinePaintBrush />
					</ToolButton.ToolSetter>
				</ToolTip>
				<ToolTip tip="Picker" keycode="P">
					<ToolButton.ToolSetter toolValue={Tool.Picker}>
						<MdInvertColors />
					</ToolButton.ToolSetter>
				</ToolTip>
				<ToolTip tip="Eraser" keycode="e">
					<ToolButton.ToolSetter toolValue={Tool.Eraser}>
						<BsEraser />
					</ToolButton.ToolSetter>
				</ToolTip>
			</div>
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolTip tip="Revert" keycode="z">
					<ToolButton callback={draw!.snapshot.previus}>
						<TfiBackLeft />
					</ToolButton>
				</ToolTip>

				<ToolTip tip="Advance" keycode="x">
					<ToolButton callback={draw!.snapshot.advance}>
						<TfiBackRight />
					</ToolButton>
				</ToolTip>
			</div>
			<div className="shadow-neutral-300 p-1 rounded-md flex lg:flex-col gap-2 shadow-md">
				<ToolTip tip="Grid" keycode="g">
					<ToolButton>
						<BsGrid3X3 />
					</ToolButton>
				</ToolTip>
				<ToolTip tip="Download" keycode="d">
					<ToolButton>
						<MdFileDownload />
					</ToolButton>
				</ToolTip>
			</div>
		</aside>
	);
}