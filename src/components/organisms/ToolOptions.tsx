import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";
import BrushOptions from "./BrushOptions";

export default function ToolOptions() {
	const draw = useContext(drawContext);
	if (!draw) return null;
	switch (draw.tool.current) {
		case Tool.Brush:
			return <BrushOptions/>;
        case Tool.Eraser:
            return <h1>Wait...</h1>
		default:
            return <h1>Wait...</h1>
	}
}
