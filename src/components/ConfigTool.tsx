import { useState } from "react";
import { BsNut } from "react-icons/bs";
import Modal from "./Modal";
import ToolCall from "./atoms/ToolCall";
import ToolTip from "./atoms/ToolTip";
import RemoteAction from "./atoms/RemoteAction";
import { MdOutlineCancel } from "react-icons/md";
import GridConfig from "./GridConfig";

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
				<Modal onClose={off}>
					<article className="bg-neutral-50 w-[90vw] max-w-[700px] p-4 rounded-md overflow-hidden">
						<header className="flex justify-between">
							<div>
								<h2 className="text-neutral-900 font-medium text-xl mb-2">Settings</h2>
								<p className="text-neutral-700">Configure your workspace</p>
							</div>
							<span className="text-3xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={off}>
								<MdOutlineCancel/>
							</span>
						</header>
						<hr className="my-3"/>
						<GridConfig/>
					</article>
				</Modal>
			)}
		</>
	);
}
