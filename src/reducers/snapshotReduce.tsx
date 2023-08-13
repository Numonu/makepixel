import { imageDataAreSame } from "../global/utilities/compare";

export type SnapshotReduceTypes = (
	state: SnapshotStateTypes,
	action: SnapshotActionTypes
) => SnapshotStateTypes;

export type SnapshotStateTypes = {
	list: ImageData[];
	listFocus: number;
};
type SnapshotActionTypes = {
	type: TypeTypes;
	value?: ImageData;
};
type TypeTypes = "add" | "advance" | "previus";

export const snapshotReduce: SnapshotReduceTypes = (
	state: SnapshotStateTypes,
	action: SnapshotActionTypes
) => {
	switch (action.type) {
		case "add": {
			if (!action.value) return state;
			if (state.list.length == 0) {
				//UPDATE
				return {
					...state,
					list: [action.value],
				};
			}
			//WE CHECK THAT THEY ARE DIFFERENT
			const IMG_ARE_SAME = imageDataAreSame(
				action.value,
				state.list[state.listFocus]
			);
			if (IMG_ARE_SAME) return state;
			//SLICE
			const newSnapshotList = [...state.list, action.value];
			if (newSnapshotList.length > 10) newSnapshotList.shift();
			//UPDATE
			return {
				list: newSnapshotList,
                listFocus : newSnapshotList.length - 1
			};
		}
		case "previus": {
            console.log("previus");
			const NEW_ORDER = Math.max(0, state.listFocus - 1);
			return {
				...state,
				listFocus: NEW_ORDER,
			};
		}
		case "advance": {
            console.log("advance");
			const NEW_ORDER = Math.min(
				Math.max(0,state.list.length - 1),
				state.listFocus + 1
			);
			return {
				...state,
				listFocus: NEW_ORDER,
			};
		}
		default:
			return state;
	}
};
