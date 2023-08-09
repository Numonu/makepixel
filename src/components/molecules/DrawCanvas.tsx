import { useRef, useEffect, useState, useContext } from "react";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import { repeatThis } from "../../global/utilities/loops";
import { Tool } from "../../global/enums/drawEnums";
import { Vector2 } from "../../global/types/vectors";
import { DrawContextTypes, drawContext } from "../../global/context/drawContext";

type DrawCanvasTypes = {
	size?: number;
};

type CanvasTypes = {
	element: HTMLCanvasElement | null;
	context: CanvasRenderingContext2D | null;
};

export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
	const draw = useContext<DrawContextTypes | null>(drawContext);
	const canvasRef = useRef(null);
	const [mouseHold, setMouseHold] = useState(false);
	const [canvas, setCanvas] = useState<CanvasTypes>({
		element: null,
		context: null,
	});
	const [brush, setBrush] = useState({
		color: "#323232",
		size: 0,
	});

	//Main-Setup
	useEffect(() => {
		//Error-Handler
		requireDependencies(canvasRef.current);
		//Setup-Canvas
		const CANVAS = canvasRef.current! as HTMLCanvasElement;
		setCanvas({
			element: CANVAS,
			context: CANVAS.getContext("2d"),
		});
		//Setup-Brush
		setBrush({
			...brush,
			size: CANVAS.width / size,
		});
	}, []);

	//Execute-Action
	const mouseAction = (x: number, y: number) => {
		//Error-Handler
		requireDependencies(canvas.element, canvas.context);
		//Pre-Config
		const normalPos = normalizeMousePos({ x, y });
		//Multi-Paint (for disable blurry effect)
		repeatThis(() => getAction({ x: normalPos.x, y: normalPos.y }, brush.size),5);
	};

	//Normalize-Mouse-Position
	const normalizeMousePos = (pos: Vector2) => {
		const CANVAS_RECT = canvas.element!.getBoundingClientRect();
		return {
			x: Math.floor((pos.x - CANVAS_RECT.left) / brush.size) * brush.size,
			y: Math.floor((pos.y - CANVAS_RECT.top) / brush.size) * brush.size,
		};
	};

	//Return-Action-Type
	const getAction = (pos: Vector2, size: number) => {
		requireDependencies(draw);
		switch (draw!.currentTool) {
			case Tool.Brush:
				canvas.context!.fillStyle = brush.color;
				return canvas.context!.fillRect(pos.x, pos.y, size, size);
			case Tool.Eraser:
				return canvas.context!.clearRect(pos.x, pos.y, size, size);
			default:
				break;
		}
	};

	const holdOn = () => setMouseHold(true);
	const holdOff = () => setMouseHold(false);

	return (
		<canvas
			className="bg-amber-500 cursor-crosshair"
			ref={canvasRef}
			width={500}
			height={500}
			onClick={(e) => mouseAction(e.clientX, e.clientY)}
			onMouseMove={(e) => mouseHold && mouseAction(e.clientX, e.clientY)}
			onMouseDown={holdOn}
			onMouseUp={holdOff}
			onMouseOut={holdOff}
			style={{ imageRendering: "pixelated" }}
		></canvas>
	);
}
