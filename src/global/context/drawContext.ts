import { createContext, Dispatch, SetStateAction } from "react";
import { Tool } from "../enums/drawEnums";

export type DrawContextTypes = {
	tool: {
		current: Tool;
		update: Dispatch<SetStateAction<Tool>>;
	};
	snapshot: {
		current: ImageData | null;
		add: (imageData: ImageData) => void;
		previus: () => void;
		advance: () => void;
	};
	color : {
		current : string;
		update : Dispatch<SetStateAction<string>>;
	}
};
const drawContext = createContext<DrawContextTypes | null>(null);

export { drawContext };
