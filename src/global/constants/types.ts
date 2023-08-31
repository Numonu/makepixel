import { FieldValue } from "firebase/firestore";

type ArtDataTypes = {
	title: string;
	likes: string[];
	tag: string;
	uid: string;
	id: string;
	timestamp: FieldValue | string;
	name: string;
	url: string;
};

export type { ArtDataTypes };
