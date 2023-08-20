import { useRef, useEffect, useContext } from "react";
import { drawContext } from "../../global/context/drawContext";

export default function GuideCanvas() {
	const draw = useContext(drawContext);
	const canvasRef = useRef(null);

	const COLOR = {
		a: "#ebebeb",
		b: "#cacaca",
	};

	useEffect(() => {
		const CANVAS = canvasRef.current! as HTMLCanvasElement;
		const CTX = CANVAS.getContext("2d") as CanvasRenderingContext2D;
		//
		const GRID_SIZE = draw!.grid.size;
		const PIXEL_SIZE = CANVAS.width / draw!.grid.size;
		//
		let colorPong = true;
		for (let y = 0; y < GRID_SIZE; y++) {
			for (let x = 0; x < GRID_SIZE; x++) {
				CTX.fillStyle = colorPong ? COLOR.a : COLOR.b;
				colorPong = !colorPong;

				CTX.fillRect(PIXEL_SIZE * x, PIXEL_SIZE * y, PIXEL_SIZE, PIXEL_SIZE);
			}
            colorPong = !colorPong;
		}
	}, [draw , COLOR.a , COLOR.b]);

	return (
		<canvas
			className="bg-red-500 absolute"
			style={{ imageRendering: "pixelated" }}
			ref={canvasRef}
			width={500}
			height={500}
		></canvas>
	);
}
