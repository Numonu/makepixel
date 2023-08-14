import { AiOutlineCopy } from "react-icons/ai";
import ToolButton from "../atoms/ToolButton";
import ToolTip from "../atoms/ToolTip";

type CopyButtonProps = {
	target: string;
};

export default function CopyButton({ target }: CopyButtonProps) {
	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(target)
			.then(() => {
				// Success message or other desired behavior
			})
			.catch(() => {
				// Handle error
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
