import { ReactNode, useContext } from "react";
import { Tool } from "../../global/enums/drawEnums";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import {
	DrawContextTypes,
	drawContext,
} from "../../global/context/drawContext";

type ToolButtonSetterTypes = {
	children: ReactNode;
	toolValue?: Tool;
};

export default function ToolButtonSetter({ children, toolValue }: ToolButtonSetterTypes) {
	requireDependencies(drawContext);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	return (
		<button
			className={`hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors ${
				draw!.currentTool == toolValue && "bg-sky-200 text-sky-900"
			}`}
			onClick={() =>
				toolValue != undefined && draw!.setCurrentTool(toolValue)
			}
		>
			{children}
		</button>
	);
}