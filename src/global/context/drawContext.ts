import {createContext} from "react";
import { Tool } from "../enums/drawEnums";
export const drawContext = createContext({
    currentTool : Tool.Brush,
    setCurrentTool : () => null
});
