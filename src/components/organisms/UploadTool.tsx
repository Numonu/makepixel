import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import ToolTip from "../atoms/ToolTip";
import RemoteAction from "../atoms/RemoteAction";
import FunctionalModal from "../molecules/FunctionalModal";

export default function UploadTool() {
	const [showModal, setShowModal] = useState(false);

	const on = () => setShowModal(true);
	const off = () => setShowModal(false);

	return (
		<>
			<ToolTip tip="Upload" keycode="u">
				<ToolCall callback={on}>
					<BsCloudUpload />
					<RemoteAction keycode="u" />
				</ToolCall>
			</ToolTip>
			{showModal && (
				<FunctionalModal
					title="Upload"
					subtitle="Share your art with thousands of other users and pixelart lovers."
					onClose={off}
				>
					<section>
						<input
							type="text"
							placeholder="Name your masterpiece"
							className="bg-neutral-200 outline-sky-200 w-1/2 p-2 rounded-md "
						/>
					</section>
				</FunctionalModal>
			)}
		</>
	);
}
