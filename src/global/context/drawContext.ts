import { createContext, Dispatch, SetStateAction } from "react";
import { Tool } from "../enums/drawTools";

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
	color: {
		current: string;
		history : string[];
		add : (newColor:string) => void;
		update : Dispatch<SetStateAction<string>>;
	};
	grid: {
		size: number;
		update: Dispatch<SetStateAction<number>>;
	};
};
const drawContext = createContext<DrawContextTypes | null>(null);

export { drawContext };
