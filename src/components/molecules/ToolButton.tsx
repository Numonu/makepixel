import { ReactNode } from "react";

type ToolButtonTypes = {
	children: ReactNode;
    selected? : boolean;
};

export default function ToolButton({ children , selected }: ToolButtonTypes) {
	return (
		<button className={`hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors ${selected && "bg-sky-200 text-sky-900"}`}>
			{children}
		</button>
	);
}
