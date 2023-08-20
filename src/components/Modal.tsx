import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalTypes = {
	children: ReactNode;
	onClose: () => void;
};
export default function Modal({ children, onClose }: ModalTypes) {
	return createPortal(
		<div
			className="bg-black bg-opacity-70 animate-visible fixed left-0 top-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm z-30"
			onClick={onClose}
		>
			<div
				className="bg-neutral-50 w-[90%] max-w-[600px] p-4 rounded-md overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body
	);
}
