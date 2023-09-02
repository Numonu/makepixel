import { doc, getDoc, setDoc } from "firebase/firestore";
import { loadSession, saveSession } from "../utilities/storage";
import { useState, useEffect, useContext } from "react";
import { db } from "../../../config/firebase.config";
import { userContext } from "../../../global/provider/context/userContext";
import { toast } from "sonner";
import { toastError } from "../../../global/utilities/comunToast";

export type DataTypes = {
	name: string;
	bio: string;
	social: {
		instagram: string;
		youtube: string;
		twitter : string;
		patreon : string;
		tiktok : string;
	};
};
export default function useBio(uid: string) {
	const user = useContext(userContext);
	const [bioData, setBioData] = useState(loadSession(uid));

	//En caso de no tener datos locales lo cargaremos de firestore
	useEffect(() => {
		if (!bioData) {
			getDoc(doc(db, "users", uid))
				.then((result) => {
					if (result.exists()) {
						const DATA = result.data() as DataTypes;
						saveSession(uid!, DATA);
						updateBio(DATA);
					}
					//si no encontramos datos , los creamos (si es nuestro perfil)
					else {
						if (uid == user?.uid) {
							//preparamos los datos de un usuario nuevo
							const send = {
								name: user.displayName ?? "New User",
								bio: "Hi, I am new to Spritecrafters",
								social: { instagram: "", youtube: "" , twitter : "" , tiktok : "" , patreon : "" },
							};
							//Creamos un nuevo perfil de usuario
							setDoc(doc(db, "users", uid), send)
								.then(() => {
									updateBio(send);
									saveSession(uid!, send);
								})
								.catch(toastError.network);
						} else toast.error("This user does not exist");
					}
				})
				.catch(toastError.network);
		}
	}, [bioData, uid, user]);

	//Actualza el estado con los datos de la biografia del usuario
	const updateBio = (newData: DataTypes) => {
		setBioData({
			name: newData.name,
			bio: newData.bio,
			social: {
				instagram: newData.social.instagram,
				youtube: newData.social.youtube,
				twitter: newData.social.twitter,
				patreon : newData.social.patreon,
				tiktok : newData.social.tiktok
			},
		});
	};

	return {
		bioData,
		setBioData,
	};
}
