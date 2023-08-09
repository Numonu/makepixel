import { ReactNode, useState } from "react";
import { drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";

type DrawProviderTypes = {
	children: ReactNode;
};

export default function DrawProvider({ children }: DrawProviderTypes) {
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
