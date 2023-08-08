import { useRef, useEffect, useState } from "react";
import { requireDependencies } from "../../global/utilities/errorHandlers";

type DrawCanvasTypes = {
	size?: number;
};
type ConfigTypes = {
	canvasEl: HTMLCanvasElement | null;
	canvasCtx: CanvasRenderingContext2D | null;
};
export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
	const canvasRef = useRef(null);
	const [mouseHold, setMouseHold] = useState(false);
	const [config, setConfig] = useState<ConfigTypes>({
		canvasEl: null,
		canvasCtx: null,
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
		setConfig({
			canvasEl: CANVAS,
			canvasCtx: CANVAS.getContext("2d"),
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
		requireDependencies(config.canvasEl, config.canvasCtx);
		//Pre-Config
		const normalPos = normalizeMousePos(x, y);
		//Multi-Paint (for disable blurry effect)
		config.canvasCtx!.fillStyle = brush.color;
		for (let i = 0; i < 5; i++) {
			config.canvasCtx!.fillRect(
				normalPos.x,
				normalPos.y,
				brush.size,
				brush.size
			);
		}
	};

	//Normalize-Mouse-Position
	const normalizeMousePos = (x: number, y: number) => {
		const CANVAS_RECT = config.canvasEl!.getBoundingClientRect();
		return {
			x: Math.floor((x - CANVAS_RECT.left) / brush.size) * brush.size,
			y: Math.floor((y - CANVAS_RECT.top) / brush.size) * brush.size,
		};
	};

	// const getCurrentPixelColor = (x:number , y:number) => {
	// 	const DATA = config.canvasCtx?.getImageData(x,y,1,1);
	// 	const RGB = DATA?.data;
	// 	return `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`
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
