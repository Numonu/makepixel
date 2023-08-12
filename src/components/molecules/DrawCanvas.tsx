import { useRef, useState, useContext } from "react";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import { repeatThis } from "../../global/utilities/loops";
import { Tool } from "../../global/enums/drawEnums";
import { Vector2 } from "../../global/types/vectors";
import {
	DrawContextTypes,
	drawContext,
} from "../../global/context/drawContext";
import useCanvas, { BrushTypes, CanvasStateTypes } from "../../hooks/useCanvas";
import useSnapshot from "../../hooks/useSnapshot";

type DrawCanvasTypes = {
	size?: number;
};

export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
	const canvasRef = useRef(null);
	const draw = useContext<DrawContextTypes | null>(drawContext);
	//
	const [brush, setBrush] = useState<BrushTypes | null>(null);
	const canvas: CanvasStateTypes = useCanvas(size, canvasRef, setBrush);
	//
	const { takeSnapshot } = useSnapshot(draw, canvas);
	//
	const [mouseHold, setMouseHold] = useState(false);

	//Execute-Action
	const mouseAction = (x: number, y: number) => {
		requireDependencies(canvas.element, canvas.context, brush);
		//Pre-Config
		const normalPos = normalizeMousePos({ x, y });
		//Multi-Paint (for disable blurry effect)
		repeatThis(
			getAction({ x: normalPos.x, y: normalPos.y }, brush!.size),
			5
		);
	};

	//Normalize-Mouse-Position
	const normalizeMousePos = (pos: Vector2) => {
		requireDependencies(brush);
		const CANVAS_RECT = canvas.element!.getBoundingClientRect();
		return {
			x:
				Math.floor((pos.x - CANVAS_RECT.left) / brush!.size) *
				brush!.size,
			y:
				Math.floor((pos.y - CANVAS_RECT.top) / brush!.size) *
				brush!.size,
		};
	};

	//Return-Action-Type
	const getAction = (pos: Vector2, size: number) => {
		requireDependencies(draw, brush);
		switch (draw!.tool.current) {
			case Tool.Brush:
				canvas.context!.fillStyle = brush!.color ?? "#262626";
				return () => canvas.context!.fillRect(pos.x, pos.y, size, size);
			case Tool.Eraser:
				return () =>
					canvas.context!.clearRect(pos.x, pos.y, size, size);
			default:
				return () => null;
		}
	};

	const holdOn = () => setMouseHold(true);
	const holdOff = () => setMouseHold(false);

	return (
		<canvas
			className="bg-amber-500 cursor-crosshair mx-auto"
			ref={canvasRef}
			width={500}
			height={500}
			onClick={(e) => mouseAction(e.clientX, e.clientY)}
			onMouseMove={(e) => mouseHold && mouseAction(e.clientX, e.clientY)}
			onMouseDown={holdOn}
			onMouseUp={() => {
				holdOff(), takeSnapshot();
			}}
			onMouseOut={holdOff}
			style={{ imageRendering: "pixelated" }}
		></canvas>
	);
}
