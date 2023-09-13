import ToolTip from "../../../../global/components/atoms/ToolTip";
import {BsDownload} from "react-icons/bs";
import ToolCall from "../atoms/ToolCall";
import RemoteAction from "../../../../global/components/atoms/RemoteAction";
import { CANVAS_ID } from "../../../../global/constants/draw";

export default function DownloadTool() {
    const downloadCanvasImage = () => {
        const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
        if(canvas){
            const imageUrl = canvas.toDataURL("image/png");
            const tempAnchor = document.createElement("a");
            tempAnchor.href = imageUrl;
            tempAnchor.download = "created_on_makepixel.png";
            tempAnchor.click();
        }
        else{
            throw new Error(`[!]No canvas element found with id ${CANVAS_ID}`);
        }
    }   
	return (
		<ToolTip tip="Download" keycode="d">
			<ToolCall callback={downloadCanvasImage}>
				<BsDownload />
				<RemoteAction keycode="d" />
			</ToolCall>
		</ToolTip>
	);
}
