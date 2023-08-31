import { CANVAS_ID, DRAW_TAGS } from "../../../../global/constants/draw";
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from "react";
import FunctionalModal from "../../../../global/components/molecules/FunctionalModal";
import Tag from "../atoms/Tag";
import { FAIL_MESSAGE } from "../../../../global/utilities/comunToast";
import { toast } from "sonner";
import { userContext } from "../../../../global/provider/context/userContext";
import useModal from "../../../../global/hooks/useModal";
import SignInModal from "../../../../global/components/organisms/SignInModal";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase.config";
import { ArtDataTypes } from "../../../../global/constants/types";
import { ALL_WORK_KEY, TOP_WORK_KEY } from "../../../constants/session";

type UploadModalTypes = {
	onClose: () => void;
};
export default function UploadModal({ onClose }: UploadModalTypes) {
	const user = useContext(userContext);
	//Datos de la publicacion
	const [title, setTitle] = useState("");
	const [selectTag, setSelectTag] = useState("other");
	//Eventos
	const [loading, setLoading] = useState(false);
	const { modal, openModal, closeModal } = useModal();

	//Indica una etiqueta
	const updateTag = (newTag: string) => setSelectTag(newTag);

	//Publicacion y envio de datos al servidor
	const publish = () => {
		//Accion exclusiva para usuarios registrados
		if (!user) {
			openModal();
			return;
		}
		//Se requiere el siguiente canvas presente en el DOM
		const CANVAS = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
		if (!CANVAS)
			throw new Error("[!]No canvas element found with id ${CANVAS_ID}");
		//Preparamos el ID unico de la publicacion
		const ID = uuidv4();
		//Preparamos los datos a enviar
		const SEND: ArtDataTypes = {
			title,
			likes: [],
			tag: selectTag,
			uid: user.uid,
			id : ID,
			timestamp: serverTimestamp(),
			name: user.displayName as string,
			url: CANVAS.toDataURL("image/png"),
		};
		//Realizamos el envio con ayuda de sonner
		setLoading(true);
		toast.promise(() => setDoc(doc(db, "gallery" , ID), SEND), {
			success: () => {
				onClose();
				setLoading(false);
				//eliminamos los datos antiguos (para que aparesca el nuevo arte)
				sessionStorage.removeItem(ALL_WORK_KEY + user.uid);
				sessionStorage.removeItem(TOP_WORK_KEY + user.uid);
				//
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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						publish();
					}}
				>
					<input
						required
						type="text"
						value={title}
						placeholder="Name your masterpiece"
						className="bg-neutral-200 w-1/2 p-2 mb-4 rounded-md "
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="mb-12">
						<h3 className="mb-4">Select a tag</h3>
						<div className="flex flex-wrap gap-4">
							{DRAW_TAGS.map((e) => (
								<Tag
									value={e}
									onClick={updateTag}
									selected={selectTag == e}
								/>
							))}
							<Tag
								value={"other"}
								onClick={updateTag}
								selected={selectTag == "other"}
							/>
						</div>
					</div>
					<button
						className="bg-sky-400 text-white py-2 px-6 mb-2 rounded-md font-medium hover:bg-sky-500 disabled:opacity-50"
						disabled={loading}
					>
						Publish
					</button>
				</form>
			</FunctionalModal>
			{modal && <SignInModal onClose={closeModal} />}
		</>
	);
}
