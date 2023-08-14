import { ReactNode, useReducer, useState } from "react";
import { drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";
import {
	snapshotReduce,
} from "../../reducers/snapshotReduce";

type DrawProviderTypes = {
	children: ReactNode;
};
export type SnapshotTypes = {
	list: ImageData[];
	listFocus: number;
};

export default function DrawProvider({ children }: DrawProviderTypes) {
	const [currentColor , setCurrentColor] = useState("#262626");

	const [currentTool, setCurrentTool] = useState(Tool.Brush);

	const [snapshot, dispatch] = useReducer(snapshotReduce, {
		list: [],
		listFocus: 0,
	});

	const addSnapshot = (imageData: ImageData) => {
		dispatch({
			type: "add",
			value: imageData,
		});
	};

	const previusSnapshot = () => {
		dispatch({
			type: "previus",
		});
	};
	const advanceSnapshot = () => {
		dispatch({
			type: "advance",
		});
	};

	return (
		<drawContext.Provider
			value={{
				tool: {
					current: currentTool,
					update: setCurrentTool,
				},
				snapshot: {
					current: snapshot.list[snapshot.listFocus],
					add: addSnapshot,
					previus: previusSnapshot,
					advance: advanceSnapshot,
				},
				color : {
					current : currentColor,
					update : setCurrentColor
				}
			}}
		>
			{children}
		</drawContext.Provider>
	);
}
