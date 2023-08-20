import { useRef, useState, useContext } from "react";
import { Vector2 } from "../../global/types/vectors";
import {
	DrawContextTypes,
	drawContext,
} from "../../global/context/drawContext";
import useCanvas, { CanvasStateTypes } from "../../hooks/useCanvas";
import useSnapshot from "../../hooks/useSnapshot";
import { CANVAS_ID } from "../../global/constant/DrawConstant";
import { executeAction } from "../../utilities/canvasActionts";

export default function DrawCanvas() {
	const canvasRef = useRef(null);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	//
	const canvas: CanvasStateTypes = useCanvas(draw!.grid.size, canvasRef);
	const { takeSnapshot } = useSnapshot(draw, canvas);
	//
	const [mouseHold, setMouseHold] = useState(false);

	//Execute-Action
	const mouseAction = (x: number, y: number) => {
		const NORMAL = normalizeMousePos({ x, y });
		executeAction(canvas , draw! , NORMAL);
	};

	//Normalizar la posicion del mouse
	const normalizeMousePos = (pos: Vector2) => {
		const CANVAS_RECT = canvas.element!.getBoundingClientRect();
		const PIXEL_SIZE = canvas.pixelSize;
		return {
			x: Math.floor((pos.x - CANVAS_RECT.left) / PIXEL_SIZE) * PIXEL_SIZE,
			y: Math.floor((pos.y - CANVAS_RECT.top) / PIXEL_SIZE) * PIXEL_SIZE,
		};
	};

	//Indica que el mouse se pulso , invoca una captura de pixeles y guarda el color usado
	const holdOn = () => {
		setMouseHold(true);
		takeSnapshot();
		//Save used color to history
		draw!.color.add(draw!.color.current);
	};
	//Indica que el mouse se dejo de pulsar e invoca una captura de pixeles
	const holdOff = () => {
		setMouseHold(false);
		takeSnapshot();
	};

	return (
		<canvas
			id={CANVAS_ID}
			className="bg-transparent absolute cursor-crosshair"
			style={{ imageRendering: "pixelated" }}
			ref={canvasRef}
			width={500}
			height={500}
			onMouseMove={(e) => mouseHold && mouseAction(e.clientX, e.clientY)}
			onClick={(e) => mouseAction(e.clientX, e.clientY)}
			onMouseDown={holdOn}
			onMouseUp={holdOff}
			onMouseOut={holdOff}
		></canvas>
	);
}
