import { ReactNode } from "react";
import ToolButtonSetter from "../compounds/ToolButtonSetter";

type ToolButtonTypes = {
	children: ReactNode;
};
export default function ToolButton({ children }: ToolButtonTypes) {
	return (
		<button className="hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors">
			{children}
		</button>
	);
}

ToolButton.Setter = ToolButtonSetter;