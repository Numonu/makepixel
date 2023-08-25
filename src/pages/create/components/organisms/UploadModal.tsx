import {
	CANVAS_ID,
	DRAW_TAGS,
} from "../../../../global/constants/DrawConstant";
import { useContext, useState } from "react";
import { PiWarningOctagonLight } from "react-icons/pi";
import FunctionalModal from "../../../../global/components/molecules/FunctionalModal";
import Tag from "../atoms/Tag";
import To from "../../../../global/components/atoms/To";
import { FAIL_MESSAGE } from "../../../../global/utilities/conventionalToast";
import { toast } from "sonner";
import { userContext } from "../../../../global/provider/context/userContext";
import useModal from "../../../../global/hooks/useModal";
import SignInModal from "../../../../global/components/organisms/SignInModal";
import useUpload, { SendTypes } from "../../hooks/useUpload";
import { serverTimestamp } from "firebase/firestore";

type UploadModalTypes = {
	onClose: () => void;
};
export default function UploadModal({ onClose }: UploadModalTypes) {
	const user = useContext(userContext);
	const [selectTag, setSelectTag] = useState("other");
	const [loading, setLoading] = useState(false);

	const { upload } = useUpload();
	const { modal, openModal, closeModal } = useModal();

	const updateTag = (newTag: string) => setSelectTag(newTag);

	//Requisitos previos a la publicacion
	const prepare = () => {
		//Accion exclusiva para usuarios registrados
		if (!user) {
			onClose();
			openModal();
			return;
		}
		//Se requiere el siguiente canvas presente en el DOM
		const CANVAS = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
		if (!CANVAS)
			throw new Error("[!]No canvas element found with id ${CANVAS_ID}");
		//Preparamos los datos a enviar
		const SEND: SendTypes = {
			tag: selectTag,
			ownerUid: user.uid,
			timestamp: serverTimestamp(),
			ownerName: user.displayName as string,
			image: CANVAS.toDataURL("image/png"),
		};
		//Realizamos el envio con ayuda de sonner
		setLoading(true);
		toast.promise(() => upload(SEND), {
			success: () => {
				onClose();
				setLoading(false);
				return "successfully published";
			},
			error: () => {
				setLoading(false);
				return FAIL_MESSAGE;
			},
			loading: "Posting...",
		});
	};

	return (
		<>
			<FunctionalModal
				title="Upload"
				subtitle="Share your art with thousands of other users and pixelart lovers."
				onClose={onClose}
			>
				<form onSubmit={(e) => e.preventDefault()}>
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
								<Tag
									color="gray"
									value={e}
									onClick={updateTag}
									selected={selectTag == e}
								/>
							))}
						</div>
					</div>
					<button
						className="bg-sky-400 text-white py-2 px-6 mb-2 rounded-md font-medium hover:bg-sky-500 disabled:opacity-50"
						disabled={loading}
						onClick={prepare}
					>
						Publish
					</button>
					<span className="flex items-center gap-1 text-xs">
						<span className="inline-block text-base">
							<PiWarningOctagonLight />
						</span>
						By posting on pixelcrafters I am agreeing to the{" "}
						<To to="/">Terms and Conditions</To>
					</span>
				</form>
			</FunctionalModal>
			{modal && <SignInModal onClose={closeModal} />}
		</>
	);
}
