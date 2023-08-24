import { ReactNode } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "./Modal";

type ModalTypes = {
	children: ReactNode;
	title: string;
	subtitle: string;
	onClose: () => void;
};
export default function FunctionalModal({
	children,
	title,
	subtitle,
	onClose,
}: ModalTypes) {
	return (
		<Modal onClose={onClose}>
			<header className="flex justify-between">
				<div>
					<h2 className="text-neutral-900 font-medium text-xl mb-2">
						{title}
					</h2>
					<p className="text-neutral-700">{subtitle}</p>
				</div>
				<button className="text-neutral-500 text-3xl" onClick={onClose}>
					<MdOutlineCancel />
				</button>
			</header>
			<hr className="my-3" />
			<section>{children}</section>
		</Modal>
	);
}
