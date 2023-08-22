import { useState } from "react";
import { BsNut } from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import ToolTip from "../../../../global/components/atoms/ToolTip";
import RemoteAction from "../../../../global/components/atoms/RemoteAction";
import FunctionalModal from "../../../../global/components/molecules/FunctionalModal";
import GridSetter from "../molecules/GridSetter";

export default function ConfigTool() {
	const [showModal, setShowModal] = useState(false);

	const on = () => setShowModal(true);
	const off = () => setShowModal(false);

	return (
		<>
			<ToolTip tip="Config" keycode="c">
				<ToolCall callback={on}>
					<BsNut />
					<RemoteAction keycode="c" />
				</ToolCall>
			</ToolTip>
			{showModal && (
				<FunctionalModal
					title="Settings"
					subtitle="Configure your workspace"
					onClose={off}
				>
					<h3 className="font-medium mb-2">Canvas Size</h3>
					<div className="w-1/2 grid grid-cols-4 gap-1">
						<GridSetter value={8} />
						<GridSetter value={16} />
						<GridSetter value={32} />
						<GridSetter value={64} />
					</div>
				</FunctionalModal>
			)}
		</>
	);
}
