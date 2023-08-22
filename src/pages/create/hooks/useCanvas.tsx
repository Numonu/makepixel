import { useEffect, useState } from "react";
import { requireDependencies } from "../../../global/utilities/errorHandlers";

type UseCanvasTypes = (
	gridSize: number,
	canvasRef: React.MutableRefObject<null>,
) => CanvasStateTypes;

export type CanvasStateTypes = {
	element: HTMLCanvasElement | null;
	context: CanvasRenderingContext2D | null;
	pixelSize: number;
};

const useCanvas: UseCanvasTypes = (gridSize, canvasRef) => {
	const [canvas, setCanvas] = useState<CanvasStateTypes>({
		element: null,
		context: null,
		pixelSize: 0,
	});
	//Actualizar el estado de propiedades de nuestro canvas
	useEffect(() => {
		requireDependencies(canvasRef.current);
		const CANVAS = canvasRef.current! as HTMLCanvasElement;
		setCanvas({
			element: CANVAS,
			context: CANVAS.getContext("2d"),
			pixelSize: CANVAS.width / gridSize,
		});
	}, [canvasRef , gridSize]);

	return {
		element: canvas.element,
		context: canvas.context,
		pixelSize : canvas.pixelSize
	};
};

export default useCanvas;
