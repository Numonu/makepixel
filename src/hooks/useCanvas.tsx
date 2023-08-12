import { useEffect, useState } from "react";
import { requireDependencies } from "../global/utilities/errorHandlers";

type UseCanvasTypes = (
	gridSize: number,
	canvasRef: React.MutableRefObject<null>,
	brushSetter?: React.Dispatch<React.SetStateAction<BrushTypes | null>>
) => CanvasStateTypes;

export type CanvasStateTypes = {
	element: HTMLCanvasElement | null;
	context: CanvasRenderingContext2D | null;
	pixelSize: number;
};

export type BrushTypes = {
	color?: string;
	size: number;
};

const useCanvas: UseCanvasTypes = (gridSize, canvasRef, brushSetter) => {
	const [canvas, setCanvas] = useState<CanvasStateTypes>({
		element: null,
		context: null,
		pixelSize: 0,
	});
	useEffect(() => {
		requireDependencies(canvasRef.current);
		const CANVAS = canvasRef.current! as HTMLCanvasElement;
		setCanvas({
			element: CANVAS,
			context: CANVAS.getContext("2d"),
			pixelSize: CANVAS.width / gridSize,
		});
		if (brushSetter) {
			brushSetter({
				color: "#262626",
				size: CANVAS.width / gridSize,
			});
		}
	}, []);

	return {
		element: canvas.element,
		context: canvas.context,
		pixelSize : canvas.pixelSize
	};
};

export default useCanvas;
