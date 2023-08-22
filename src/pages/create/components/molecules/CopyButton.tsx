import { AiOutlineCopy } from "react-icons/ai";
import {toast} from "sonner";
import ToolButton from "../atoms/ToolCall";
import ToolTip from "../../../../global/components/atoms/ToolTip";

type CopyButtonProps = {
	target: string;
};

export default function CopyButton({ target }: CopyButtonProps) {
	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(target)
			.then(() => {
				toast.success("Color copied to clipboard");
			})
			.catch(() => {
				toast.error("This function is not supported");
			});
	};

	return (
		<ToolTip tip="Copy">
			<ToolButton callback={copyToClipboard}>
				<span className="text-xl">
					<AiOutlineCopy />
				</span>
			</ToolButton>
		</ToolTip>
	);
}
