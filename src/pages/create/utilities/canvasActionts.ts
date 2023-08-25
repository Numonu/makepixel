import { DrawContextTypes } from "../context/drawContext";
import { Tool } from "../enums/drawTools";
import { repeatThis } from "../../../global/utilities/loops";
import { CanvasStateTypes } from "../hooks/useCanvas";

const executeAction = (
	canvas: CanvasStateTypes,
	draw: DrawContextTypes,
	pos: {x:number,y:number}
) => {
	const PIXEL_SIZE = canvas.pixelSize;

	switch (draw!.tool.current) {
		case Tool.Brush:
			repeatThis(() => {
				canvas.context!.fillStyle = draw!.color.current;
				canvas.context!.fillRect(pos.x, pos.y, PIXEL_SIZE, PIXEL_SIZE);
			}, 2);
			break;
		case Tool.Eraser:
			repeatThis(() => {
				canvas.context!.clearRect(pos.x, pos.y, PIXEL_SIZE, PIXEL_SIZE);
			}, 2);
			break;
		case Tool.Picker:
			{
				const PIXEL = canvas.context!.getImageData(pos.x,pos.y,1,1).data;
				const HEX = "#" +((1 << 24) | (PIXEL[0] << 16) | (PIXEL[1] << 8) | PIXEL[2]).toString(16).slice(1);
				draw!.color.update(HEX);
			}
			break;
		default:
			return null;
	}
};

export { executeAction };
