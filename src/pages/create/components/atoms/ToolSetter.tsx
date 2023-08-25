import { ReactNode, useContext } from "react";
import { DrawContextTypes, drawContext } from "../../context/drawContext";
import { requireDependencies } from "../../../../global/utilities/errorHandlers";
import { Tool } from "../../enums/drawTools";


type ToolSetterTypes = {
	children: ReactNode;
	toolValue?: Tool;
};

export default function ToolSetter({ children, toolValue }: ToolSetterTypes) {
	requireDependencies(drawContext);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	return (
		<button
			className={`hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors ${
				draw!.tool.current == toolValue && "bg-sky-200 text-sky-900"
			}`}
			onClick={() =>
				toolValue != undefined && draw!.tool.update(toolValue)
			}
		>
			{children}
		</button>
	);
}