import { useRef, useEffect, useState } from "react";
import { Vector2 } from "../../global/types/vectors";

type DrawCanvasTypes = {
	size?: number;
};
type ConfigTypes = {
	canvasEl: HTMLCanvasElement | null;
	canvasCtx: CanvasRenderingContext2D | null;
};
export default function DrawCanvas({ size = 8 }: DrawCanvasTypes) {
	const [config, setConfig] = useState<ConfigTypes>({
		canvasEl: null,
		canvasCtx: null,
	});
	const [brush, setBrush] = useState({
		color: "#323232",
		size: 0,
	});
	const canvasRef = useRef(null);

	//setup canvas
	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current as HTMLCanvasElement;
			setConfig({
				canvasEl: canvas,
				canvasCtx: canvas.getContext("2d"),
			});
			//setup brush
			setBrush({
				...brush,
				size: canvas.width / size,
			});
		}
	}, []);

	const drawPixel = (mouse: Vector2) => {
		if (!config.canvasCtx) return;
		config.canvasCtx.fillStyle = brush.color;
		for (let i = 0; i < 5; i++) {
			config.canvasCtx.fillRect(
				(mouse.x * brush.size) + (i * 0.01),
				(mouse.y * brush.size) + (i * 0.01),
				brush.size,
				brush.size
			);
		}
	};

	const handleMotion = (x: number, y: number) => {
		if (!config.canvasEl) return;
		const rect = config.canvasEl.getBoundingClientRect();
		drawPixel({
			x: Math.floor((x - rect.left) / brush.size),
			y: Math.floor((y - rect.top) / brush.size),
		});
	};

	return (
		<canvas
			className="bg-amber-500 mx-auto"
			ref={canvasRef}
			width={500}
			height={500}
			onMouseMove={(e) => handleMotion(e.clientX, e.clientY)}
			style={{ imageRendering: "pixelated" }}
		></canvas>
	);
}
