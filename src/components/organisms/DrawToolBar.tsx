import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsEraser } from "react-icons/bs";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdInvertColors } from "react-icons/md";
import { BsNut , BsCloudUpload , BsDownload} from "react-icons/bs";
import ToolButton from "../atoms/ToolButton";
import { Tool } from "../../global/enums/drawEnums";
import ToolTip from "../atoms/ToolTip";
import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import RemoteAction from "../atoms/RemoteAction";

export default function PaintToolBar() {
	requireDependencies(drawContext);
	const draw = useContext(drawContext);
	return (
		<aside className="flex flex-row gap-6 lg:flex-col">
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Brush" keycode="q">
					<ToolButton.ToolSetter toolValue={Tool.Brush}>
						<HiOutlinePaintBrush />
						<RemoteAction keycode="q"/>
					</ToolButton.ToolSetter>
				</ToolTip>
				<ToolTip tip="Picker" keycode="w">
					<ToolButton.ToolSetter toolValue={Tool.Picker}>
						<MdInvertColors />
						<RemoteAction keycode="w"/>
					</ToolButton.ToolSetter>
				</ToolTip>
				<ToolTip tip="Eraser" keycode="e">
					<ToolButton.ToolSetter toolValue={Tool.Eraser}>
						<BsEraser />
						<RemoteAction keycode="e"/>
					</ToolButton.ToolSetter>
				</ToolTip>
			</div>
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Revert" keycode="z">
					<ToolButton callback={draw!.snapshot.previus}>
						<TfiBackLeft />
						<RemoteAction keycode="z"/>
					</ToolButton>
				</ToolTip>

				<ToolTip tip="Advance" keycode="x">
					<ToolButton callback={draw!.snapshot.advance}>
						<TfiBackRight />
						<RemoteAction keycode="x"/>
					</ToolButton>
				</ToolTip>
			</div>
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Config" keycode="c">
					<ToolButton>
						<BsNut />
						<RemoteAction keycode="c"/>
					</ToolButton>
				</ToolTip>
				<ToolTip tip="Download" keycode="d">
					<ToolButton>
						<BsDownload />
						<RemoteAction keycode="d"/>
					</ToolButton>
				</ToolTip>
				<ToolTip tip="Upload" keycode="u">
					<ToolButton>
						<BsCloudUpload/>
						<RemoteAction keycode="u"/>
					</ToolButton>
				</ToolTip>
			</div>
		</aside>
	);
}
