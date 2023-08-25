import { BsCloudUpload } from "react-icons/bs";
import ToolTip from "../../../../global/components/atoms/ToolTip";
import ToolCall from "../atoms/ToolCall";
import UploadModal from "./UploadModal";
import RemoteAction from "../../../../global/components/atoms/RemoteAction";
import useModal from "../../../../global/hooks/useModal";

export default function UploadTool() {
	const { modal, openModal, closeModal } = useModal();
	return (
		<>
			<ToolTip tip="Upload" keycode="u">
				<ToolCall callback={openModal}>
					<BsCloudUpload />
					<RemoteAction keycode="u" />
				</ToolCall>
			</ToolTip>
			{modal && <UploadModal onClose={closeModal} />}
		</>
	);
}
