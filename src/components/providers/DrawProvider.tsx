import { ReactNode, useState } from "react";
import { drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";
import { imageDataAreSame } from "../../global/utilities/compare";

type DrawProviderTypes = {
	children: ReactNode;
};
export type SnapshotTypes = {
	list: ImageData[];
	listFocus: number;
};

export default function DrawProvider({ children }: DrawProviderTypes) {
	const [currentTool, setCurrentTool] = useState(Tool.Brush);

	const [snapshot, setSnapshot] = useState<SnapshotTypes>({
		list: [],
		listFocus: 0,
	});

	const addSnapshot = (imageData: ImageData) => {
		//does not apply if there are no changes between this one and the previous one
		if (snapshot.list.length > 0 && imageDataAreSame(imageData, snapshot.list[snapshot.listFocus]))
			return;
		//
		alert("se agrego una nueva imagen owo");
		const newSnapshotList = [...snapshot.list, imageData];
		//slice and update
		if (newSnapshotList.length > 5) newSnapshotList.shift();
		snapshot.listFocus = newSnapshotList.length - 1;
		setSnapshot({
			...snapshot,
			list: newSnapshotList,
		});
	};

	const previusSnapshot = () => {
		const NEW_ORDER = Math.max(0, snapshot.listFocus - 1);
		setSnapshot({
			...snapshot,
			listFocus: NEW_ORDER,
		});
	};
	const advanceSnapshot = () => {
		const NEW_ORDER = Math.min(
			snapshot.list.length - 1,
			snapshot.listFocus + 1
		);
		setSnapshot({
			...snapshot,
			listFocus: NEW_ORDER,
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
			}}
		>
			{children}
		</drawContext.Provider>
	);
}
