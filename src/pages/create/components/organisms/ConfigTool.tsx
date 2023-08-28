import { useContext } from "react";
import { BsNut } from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import ToolTip from "../../../../global/components/atoms/ToolTip";
import RemoteAction from "../../../../global/components/atoms/RemoteAction";
import FunctionalModal from "../../../../global/components/molecules/FunctionalModal";
import GridSetter from "../molecules/GridSetter";
import { remoteContext } from "../../../../global/provider/context/remoteContext";
import useModal from "../../../../global/hooks/useModal";

export default function ConfigTool() {
	const { enableRemotes, disableRemotes } = useContext(remoteContext);
	const { modal, closeModal, openModal } = useModal();

	return (
		<>
			<ToolTip tip="Config" keycode="c">
				<ToolCall
					callback={() => {
						openModal();
						disableRemotes();
					}}
				>
					<BsNut />
					<RemoteAction keycode="c" />
				</ToolCall>
			</ToolTip>
			{modal && (
				<FunctionalModal
					title="Settings"
					subtitle="Configure your workspace"
					onClose={() => {
						closeModal();
						enableRemotes();
					}}
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
