import { FieldValue } from "firebase/firestore";

type ArtData = {
	title: string;
	likes: number;
	tag: string;
	uid: string;
	timestamp: FieldValue | string;
	name: string;
	url: string;
};

export type { ArtData };
