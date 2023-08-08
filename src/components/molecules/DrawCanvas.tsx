import { useRef, useEffect, useState } from "react";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import { repeatThis } from "../../global/utilities/loops";

type DrawCanvasTypes = {
	size?: number;
};

type CanvasTypes = {
	element: HTMLCanvasElement | null;
	context: CanvasRenderingContext2D | null;
};

export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
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

	//Paint-Pixel
	const drawPixel = (x: number, y: number) => {
		//Error-Handler
		requireDependencies(canvas.element, canvas.context);
		//Pre-Config
		const normalPos = normalizeMousePos(x, y);
		//Multi-Paint (for disable blurry effect)
		canvas.context!.fillStyle = brush.color;
		repeatThis(() => {
			canvas.context!.fillRect(
				normalPos.x,
				normalPos.y,
				brush.size,
				brush.size
			);
		}, 5);
	};

	//Normalize-Mouse-Position
	const normalizeMousePos = (x: number, y: number) => {
		const CANVAS_RECT = canvas.element!.getBoundingClientRect();
		return {
			x: Math.floor((x - CANVAS_RECT.left) / brush.size) * brush.size,
			y: Math.floor((y - CANVAS_RECT.top) / brush.size) * brush.size,
		};
	};

	// const getCurrentPixelColor = (x:number , y:number) => {
	// 	//Error-Handler
	// 	requireDependencies(config.canvasCtx);
	// 	//
	// 	const DATA = config.canvasCtx!.getImageData(x,y,1,1);
	// 	const RGB = DATA.data;
	// 	return `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${RGB[3]})`
	// }

	const holdOn = () => setMouseHold(true);
	const holdOff = () => setMouseHold(false);

	return (
		<canvas
			className="bg-amber-500 cursor-crosshair"
			ref={canvasRef}
			width={500}
			height={500}
			onClick={(e) => drawPixel(e.clientX, e.clientY)}
			onMouseMove={(e) => mouseHold && drawPixel(e.clientX, e.clientY)}
			onMouseDown={holdOn}
			onMouseUp={holdOff}
			onMouseOut={holdOff}
			style={{ imageRendering: "pixelated" }}
		></canvas>
	);
}
