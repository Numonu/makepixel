import { createContext, Dispatch, SetStateAction } from "react";
import { Tool } from "../enums/drawEnums";

export type DrawContextTypes = {
	currentTool: Tool;
	setCurrentTool: Dispatch<SetStateAction<Tool>>;
};
const drawContext = createContext<DrawContextTypes | null>(null);

export { drawContext };
