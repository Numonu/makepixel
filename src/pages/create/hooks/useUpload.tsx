import { useContext } from "react";
import { FieldValue, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase.config";
import { userContext } from "../../../global/provider/context/userContext";

export type SendTypes = {
	ownerName: string;
    ownerUid : string;
	tag: string;
	image: string;
	timestamp: FieldValue;
};

export default function useUpload() {
	const user = useContext(userContext);

	//Publicar en la galeria
	const uploadToGallery = async (send: SendTypes) => {
		await addDoc(collection(db, "gallery"), send);
	};

	//Publicar en el usuario
	const uploadToUser = (send: SendTypes) => {
		return setDoc(doc(db, "users", user!.uid), send, { merge: true });
	};

	//Publicamos en ambos ambitos
	const upload = (send: SendTypes) => {
		return Promise.all([uploadToGallery(send), uploadToUser(send)]);
	};

	return {
		upload,
	};
}
