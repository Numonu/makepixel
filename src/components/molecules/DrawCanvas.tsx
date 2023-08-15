import { useRef, useState, useContext } from "react";
import { repeatThis } from "../../global/utilities/loops";
import { Tool } from "../../global/enums/drawEnums";
import { Vector2 } from "../../global/types/vectors";
import {
	DrawContextTypes,
	drawContext,
} from "../../global/context/drawContext";
import useCanvas, { CanvasStateTypes } from "../../hooks/useCanvas";
import useSnapshot from "../../hooks/useSnapshot";

type DrawCanvasTypes = {
	size?: number;
};

export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
	const canvasRef = useRef(null);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	//
	const canvas: CanvasStateTypes = useCanvas(size, canvasRef);
	const { takeSnapshot } = useSnapshot(draw, canvas);
	//
	const [mouseHold, setMouseHold] = useState(false);

	//Execute-Action
	const mouseAction = (x: number, y: number) => {
		const NORMAL = normalizeMousePos({ x, y });
		repeatThis(getAction(NORMAL), 5);
	};

	//Normalize-Mouse-Position
	const normalizeMousePos = (pos: Vector2) => {
		const CANVAS_RECT = canvas.element!.getBoundingClientRect();
		const PIXEL_SIZE = canvas.pixelSize;
		return {
			x: Math.floor((pos.x - CANVAS_RECT.left) / PIXEL_SIZE) * PIXEL_SIZE,
			y: Math.floor((pos.y - CANVAS_RECT.top) / PIXEL_SIZE) * PIXEL_SIZE,
		};
	};

	//Return-Action-Type
	const getAction = (pos: Vector2) => {
		const PIXEL_SIZE = canvas.pixelSize;

		switch (draw!.tool.current) {
			case Tool.Brush:
				canvas.context!.fillStyle = draw!.color.current;
				return () =>
					canvas.context!.fillRect(
						pos.x,
						pos.y,
						PIXEL_SIZE * draw!.effectSize.current,
						PIXEL_SIZE * draw!.effectSize.current
					);
			case Tool.Eraser:
				return () =>
					canvas.context!.clearRect(
						pos.x,
						pos.y,
						PIXEL_SIZE,
						PIXEL_SIZE
					);
			default:
				return () => null;
		}
	};

	const holdOn = () => {
		setMouseHold(true); takeSnapshot();
	};
	const holdOff = () => {
		setMouseHold(false); takeSnapshot();
	};

	return (
		<canvas
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
