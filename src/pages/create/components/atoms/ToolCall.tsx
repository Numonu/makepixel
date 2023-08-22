import { ReactNode } from "react";

type ToolCallTypes = {
	children: ReactNode;
	callback? : () => void;
};
export default function ToolCall({ children , callback }: ToolCallTypes) {
	return (
		<button className="hover:bg-sky-200 p-2 text-2xl rounded-sm transition-colors active:bg-sky-300" onClick={callback}>
			{children}
		</button>
	);
}
