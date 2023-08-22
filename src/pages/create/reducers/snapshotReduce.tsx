import { imageDataAreSame } from "../../../global/utilities/compare";

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
		//En este caso agregamos un nuevo snapshot a la cola
		case "add": {
			if (!action.value) return state;
			//Si nuestra cola esta vacia simplemente agregamos la nueva
			if (state.list.length == 0) {
				return {
					...state,
					list: [action.value],
				};
			}
			//Para continuar el nuevo snapshot debe ser diferente al anterior
			const IMG_ARE_SAME = imageDataAreSame(
				action.value,
				state.list[state.listFocus]
			);
			if (IMG_ARE_SAME) return state;
			//Si la cola excede el limite la cortamos
			const newSnapshotList = [...state.list, action.value];
			if (newSnapshotList.length > 10) newSnapshotList.shift();
			//Agregamos la nueva snapshot a la cola
			return {
				list: newSnapshotList,
                listFocus : newSnapshotList.length - 1
			};
		}
		//Movemos el foco al snapshot anterior
		case "previus": {
            console.log("previus");
			const NEW_ORDER = Math.max(0, state.listFocus - 1);
			return {
				...state,
				listFocus: NEW_ORDER,
			};
		}
		//Movemos el foco al snapshot siguiente
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
