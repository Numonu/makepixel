import { doc, getDoc } from "firebase/firestore";
import { loadStorage, saveStorage } from "../utilities/storage";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase.config";

export type DataTypes = {
	username: string;
	description: string;
	link: {
		instagram: string;
		youtube: string;
	};
};
export default function useBio(uid: string) {
	const [bioData, setBioData] = useState(loadStorage(uid));

	//En caso de no tener datos locales lo cargaremos de firestore
	useEffect(() => {
		if (!bioData) {
			getDoc(doc(db, "users", uid)).then((result) => {
				if (result.exists()) {
					const DATA = result.data() as DataTypes;
					saveStorage(uid!, DATA);
					updateBio(DATA);
				}
			});
		}
	}, [bioData, uid]);

	//Actualza el estado con los datos de la biografia del usuario
	const updateBio = (newData: DataTypes) => {
		setBioData({
			username: newData.username,
			description: newData.description,
			link: {
				instagram: newData.link.instagram,
				youtube: newData.link.youtube,
			},
		});
	};

	return {
		bioData,
		setBioData,
	};
}
