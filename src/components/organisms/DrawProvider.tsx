import { ReactNode, useState, createContext } from "react";

type PaintProviderTypes = {
	children: ReactNode;
};
const enum Tool {
	Brush,
	Picker,
	Eraser,
}
const drawContext = createContext({});

export default function DrawProvider({ children }: PaintProviderTypes) {
	const [currentTool, setCurrentTool] = useState(Tool.Brush);
	return (
		<drawContext.Provider
			value={{
				currentTool,
				setCurrentTool,
			}}
		>
			{children}
		</drawContext.Provider>
	);
}
