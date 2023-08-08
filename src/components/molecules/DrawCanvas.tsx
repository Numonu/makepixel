import { useRef, useEffect, useState } from "react";

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

	//Setup
	useEffect(() => {
		if (!canvasRef.current) {
			throw new Error("A reference to the Canvas is required ");
		}
		//Setup-Canvas
		const CANVAS = canvasRef.current as HTMLCanvasElement;
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

	//Paint
	const drawPixel = (x: number, y: number) => {
		//Error-Handler
		if (!config.canvasCtx || !config.canvasEl) {
			throw new Error(
				"Some dependency of the canvas is missing, correct it in order to be able to draw"
			);
		}
		//Pre-Config
		const CANVAS_RECT = config.canvasEl.getBoundingClientRect();
		const X = Math.floor((x - CANVAS_RECT.left) / brush.size);
		const Y = Math.floor((y - CANVAS_RECT.top) / brush.size);
		//Multi-Paint (for disable blurry effect)
		config.canvasCtx.fillStyle = brush.color;
		for (let i = 0; i < 5; i++) {
			config.canvasCtx.fillRect(
				X * brush.size,
				Y * brush.size,
				brush.size,
				brush.size
			);
		}
	};

	const holdOn = () => setMouseHold(true);
	const holdOff = () => setMouseHold(false);

	return (
		<canvas
			className="bg-amber-500 mx-auto"
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
