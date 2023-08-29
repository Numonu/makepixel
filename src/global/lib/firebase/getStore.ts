import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";

const getStore = async (
	collection: string,
	document: string,
	field: string
) => {
	const result = await getDoc(doc(db, collection, document));
	if (result.exists()) {
		const data = result.data();
		return data[field];
	}
	throw new Error(
		`[!]The ${document} document in the ${collection} collection does not exist`
	);
};

export default {
	getStore,
};
