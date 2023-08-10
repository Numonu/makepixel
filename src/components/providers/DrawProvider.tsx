import { ReactNode, useState } from "react";
import { drawContext } from "../../global/context/drawContext";
import { Tool } from "../../global/enums/drawEnums";

type DrawProviderTypes = {
	children: ReactNode;
};
export type SnapshotTypes = {
	list : ImageData[],
	current : ImageData | null,
	listFocus : number
}

export default function DrawProvider({ children }: DrawProviderTypes) {
	const [currentTool, setCurrentTool] = useState(Tool.Brush);

	const [snapshot , setSnapshot] = useState<SnapshotTypes>({
		list : [],
		current : null,
		listFocus : 0
	});

	const addSnapshot = (imageData : ImageData) => {
		snapshot.current = imageData;
		const newSnapshotList = [
			...snapshot.list,
			imageData
		]
		//slice and update
		if(newSnapshotList.length > 5) newSnapshotList.shift();
		snapshot.listFocus = newSnapshotList.length - 1;
		setSnapshot({
			...snapshot,
			list : newSnapshotList
		})
	}

	const previusSnapshot = () => {
		setSnapshot({
			...snapshot,
			current : snapshot.list[snapshot.listFocus - 1]
		})
	}
	const advanceSnapshot = () => {
		setSnapshot({
			...snapshot,
			current : snapshot.list[snapshot.listFocus + 1]
		})
	}

	return (
		<drawContext.Provider
			value={{
				tool : {
					current : currentTool,
					update : setCurrentTool
				},
				snapshot : {
					current : snapshot.current,
					add : addSnapshot,
					previus : previusSnapshot,
					advance : advanceSnapshot
				},
			}}
		>
			{children}
		</drawContext.Provider>
	);
}
