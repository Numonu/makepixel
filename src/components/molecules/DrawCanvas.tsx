import { useRef, useState, useContext } from "react";
import { repeatThis } from "../../global/utilities/loops";
import { Tool } from "../../global/enums/drawTools";
import { Vector2 } from "../../global/types/vectors";
import {
	DrawContextTypes,
	drawContext,
} from "../../global/context/drawContext";
import useCanvas, { CanvasStateTypes } from "../../hooks/useCanvas";
import useSnapshot from "../../hooks/useSnapshot";
import { CANVAS_ID } from "../../global/constant/DrawConstant";

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
		repeatThis(getAction(NORMAL), 3);
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

	//Devolver una callback correspondiente a la accion de nuestra herramienta activa
	const getAction = (pos: Vector2) => {
		const PIXEL_SIZE = canvas.pixelSize;

		switch (draw!.tool.current) {
			case Tool.Brush:
				return () => {
					canvas.context!.fillStyle = draw!.color.current;
					canvas.context!.fillRect(
						pos.x,
						pos.y,
						PIXEL_SIZE,
						PIXEL_SIZE
					);
				}
			case Tool.Eraser:
				return () => {
					canvas.context!.clearRect(
						pos.x,
						pos.y,
						PIXEL_SIZE,
						PIXEL_SIZE
					);
				}
			case Tool.Picker:
				return () => {
					const PIXEL = canvas.context!.getImageData(pos.x,pos.y,1,1).data;
					const HEX = '#' + ((1 << 24) | (PIXEL[0] << 16) | (PIXEL[1] << 8) | PIXEL[2]).toString(16).slice(1);
					draw!.color.update(HEX);	
				}
			default:
				return () => null;
		}
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
			className="bg-amber-500 cursor-crosshair mx-auto"
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
