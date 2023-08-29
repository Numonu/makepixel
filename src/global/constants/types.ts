import { FieldValue } from "firebase/firestore";

type ArtDataTypes = {
	title: string;
	likes: number;
	tag: string;
	uid: string;
	timestamp: FieldValue | string;
	name: string;
	url: string;
};

export type { ArtDataTypes };
