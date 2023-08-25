import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalTypes = {
	className?: string;
	children: ReactNode;
	onClose: () => void;
};
export default function Modal({ children, className, onClose }: ModalTypes) {
	return createPortal(
		<article
			className="bg-black bg-opacity-70 animate-visible fixed left-0 top-0 w-screen h-screen py-12 flex justify-center backdrop-blur-sm z-30 overflow-y-scroll"
			onClick={onClose}
		>
			<div
				className={`bg-white w-[90%] h-max max-w-[600px] p-4 rounded-md ${className}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</article>,
		document.body
	);
}
