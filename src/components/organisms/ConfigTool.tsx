import { useState } from "react";
import { BsNut } from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import ToolTip from "../atoms/ToolTip";
import RemoteAction from "../atoms/RemoteAction";
import GridConfig from "../molecules/GridConfig";
import FunctionalModal from "../molecules/FunctionalModal";

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
					<GridConfig />
				</FunctionalModal>
			)}
		</>
	);
}
