import { ReactNode } from "react";
import ToolButtonSetter from "../compounds/ToolButtonToolSetter";

type ToolButtonTypes = {
	children: ReactNode;
	callback? : () => void;
};
export default function ToolButton({ children , callback }: ToolButtonTypes) {
	return (
		<button className="hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors" onClick={callback}>
			{children}
		</button>
	);
}

ToolButton.ToolSetter = ToolButtonSetter;