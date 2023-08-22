import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import ToolTip from "../../../../global/components/atoms/ToolTip";
import RemoteAction from "../../../../global/components/atoms/RemoteAction";
import FunctionalModal from "../../../../global/components/molecules/FunctionalModal";
import Tag from "../atoms/Tag";
import { Link } from "react-router-dom";
import { PiWarningOctagonLight } from "react-icons/pi";
import { DRAW_TAGS } from "../../../../global/constants/DrawConstant";

export default function UploadTool() {
	const [showModal, setShowModal] = useState(false);
	const [selectTag , setSelectTag] = useState("other");

	const on = () => setShowModal(true);
	const off = () => setShowModal(false);

	const updateTag = (newTag:string) => setSelectTag(newTag);

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
					<form>
						<input
							required
							type="text"
							placeholder="Name your masterpiece"
							className="bg-neutral-200 w-1/2 p-2 mb-4 rounded-md "
						/>
						<div className="mb-12">
							<h3 className="mb-4">Select a tag</h3>
							<div className="flex flex-wrap gap-4">
								{DRAW_TAGS.map((e) => (
									<Tag color="gray" value={e} onClick={updateTag} selected={selectTag == e}/>
								))}
							</div>
						</div>
						<button className="bg-sky-400 text-white py-2 px-6 mb-2 rounded-md font-medium hover:bg-sky-500">
							Publish
						</button>
						<span className="flex items-center gap-1 text-xs">
							<span className="inline-block text-base">
								<PiWarningOctagonLight />
							</span>
							By posting on pixelcrafters I am agreeing to the{" "}
							<Link
								to={""}
								className="text-sky-500 hover:underline"
							>
								Terms and Conditions
							</Link>
						</span>
					</form>
				</FunctionalModal>
			)}
		</>
	);
}
