import { useEffect } from "react";
import { DrawContextTypes } from "../global/context/drawContext";
import { CanvasStateTypes } from "./useCanvas";
import { checkDependencies } from "../global/utilities/errorHandlers";

type UseSnapshotType = (
	draw: DrawContextTypes | null,
	canvas: CanvasStateTypes
) => { takeSnapshot: () => void };
const useSnapshot: UseSnapshotType = (draw, canvas) => {
	//Actualizar en consecuencia los pixeles de nuetro canvas
	useEffect(() => {
		if (checkDependencies(draw, canvas.context , draw?.snapshot.current)) {
			canvas.context!.putImageData(draw!.snapshot.current!, 0, 0);
		}
	}, [canvas, draw]);
	//Capturar los pixeles actuales de nuestro canvas y agregarlo a la cola de snapshots
	const takeSnapshot = () => {
		if (!checkDependencies(draw, canvas)) return;
		draw!.snapshot.add(
			canvas.context!.getImageData(
				0,
				0,
				canvas.element!.width,
				canvas.element!.height
			)
		);
	};
	return { takeSnapshot };
};

export default useSnapshot;
