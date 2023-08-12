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
		if(snapshot.list.length == 0){
			//UPDATE
			setSnapshot({
				...snapshot,
				list: [imageData],
			});
			return;
		}
		//WE CHECK THAT THEY ARE DIFFERENT
		const IMG_ARE_SAME = imageDataAreSame(imageData, snapshot.list[snapshot.listFocus]);
		if(IMG_ARE_SAME) return;
		//SLICE
		const newSnapshotList = [...snapshot.list, imageData];
		if (newSnapshotList.length > 5) newSnapshotList.shift();
		//UPDATE
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
